import {Customer} from "../../Model/Customers";
import {InvoiceItems} from "../../Model/InvoiceItems";
import {Invoices} from "../../Model/Invoices";

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
        total: total,
        discount: discount ? discount : 0,
        subTotal: total - discount ? discount : 0
    })

    await newInvoice.save()
    return {
        msg: "Invoice Created",
        code: "SUCCESS"
    }
}
