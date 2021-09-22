import {Customer} from "../../Model/Customers";
import {InvoiceItems} from "../../Model/InvoiceItems";
import {Invoices} from "../../Model/Invoices";
import fs from "fs";
import {User} from "../../Model/User";
import {addCustomerToInvoice, randomIntFromInterval} from "../../Helper/Helper";

export const CreateInvoices = async (parent, args, ctx, req) => {
    const {customer, invoiceItems, discount} = args.payload
    const {user} = ctx

    const newCustomer = new Customer(customer)
    await newCustomer.save()

    const allInvoiceItems = await InvoiceItems.insertMany(invoiceItems)

    let total = 0

    let invoiceItemsIds = []

    for (let i = 0; i < allInvoiceItems.length; i++) {
        total += (allInvoiceItems[i].itemQty) * (allInvoiceItems[i].itemUnitPrice)
        invoiceItemsIds.push(allInvoiceItems[i]._id)
    }

    const newInvoice = new Invoices({
        customer: newCustomer._id,
        invoiceItems: invoiceItemsIds,
        invoiceCreator: user._id,
        subTotal: total,
        discount: discount ? discount : 0,
        total: total - discount ? discount : 0
    })

    await newInvoice.save()
    return {
        msg: "Invoice Created",
        code: "SUCCESS"
    }
}

export const CreateBulkInvoices = async (parent, args, ctx, req) => {

    let CustomerJson = fs.readFileSync('./Customer.json', 'utf8')
    let InvoiceItemsJson = fs.readFileSync('./InvoiceItem.json', 'utf8')

    let invoiceItems = JSON.parse(InvoiceItemsJson)

    let customers = JSON.parse(CustomerJson)
    customers.forEach(customer => {
        customer.createdAt = new Date()
        customer.updatedAt = new Date()
    })
    let customerIds = []

    const customersSeededData = await Customer.insertMany(customers)

    for (let i = 0; i < customersSeededData.length; i++) {
        customerIds.push(customersSeededData[i]._id)
    }

    invoiceItems.forEach(invoiceItem => {
        invoiceItem.createdAt = new Date()
        invoiceItem.updatedAt = new Date()
    })

    let invoiceItemsIds = []

    const invoiceItemSeedData = await InvoiceItems.insertMany(invoiceItems)

    for (let i = 0; i < invoiceItemSeedData.length; i++) {
        invoiceItemsIds.push(invoiceItemSeedData[i]._id)
    }

    const user = await User.findOne({})
    let date = new Date()
    for (let i = 1; i <= 30; i++) {
        date.setDate(date.getDate() + i)

        let invoiceRandomNumber = randomIntFromInterval(1,7)
        let invoiceSeedArr = []
        for (let j = 0; j < invoiceRandomNumber; j++) {
            let randomNumber = randomIntFromInterval(i, i+10)
            let items = invoiceItemsIds.slice(i, randomNumber)
            let seedData = invoiceItemSeedData.slice(i, randomNumber)
            let total = 0
            console.log(items)
            seedData.forEach(item => {
                total += (item.itemQty) * (item.itemUnitPrice)
            })
            let invoiceObj = {
                invoiceItems: items,
                invoiceCreator: user._id,
                total: total,
                subTotal: total,
                discount: 0,
                updatedAt: date,
                createdAt: date
            }
            invoiceSeedArr.push(invoiceObj)
        }

        await Invoices.insertMany(invoiceSeedArr)
    }

    await addCustomerToInvoice()


    return {
        msg: "Done"
    }

}

