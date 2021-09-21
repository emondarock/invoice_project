import {googleAuth} from "../../Constant/Config";
import {Customer} from "../../Model/Customers";
import {User} from "../../Model/User";
import {Invoices} from "../../Model/Invoices";
import {InvoiceItems} from "../../Model/InvoiceItems";
import fs from 'fs'

const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(googleAuth.client_id);


export const testQuery = async (parent, args, ctx, req) => {
    // await addCustomerToInvoice()
    const invoiceSummary = await Invoices.aggregate()
        .group({
            _id: {  day: { $dayOfYear: "$updatedAt"}},
            first: {$min: "$updatedAt"},
            totalItems: {
                $sum: {
                    $size: "$invoiceItems"
                },
            },
            totalAmount: {
                $sum: "$total"
            },
            totalInvoice: {
                $sum: 1
            }
        })
        .sort({_id: -1})
        .project({
            date: "$first",
            totalItems: 1,
            totalAmount: 1,
            totalInvoice: 1
        })

    await fs.writeFileSync("invoiceData.json", JSON.stringify(invoiceSummary))


    console.log(invoiceSummary)

    return {
        msg: "Done"
    }
}


const addCustomerToInvoice = async () => {
    let customers = await Customer.find()
    for (let i = 0; i < customers.length; i++) {


        const allInvoices = await Invoices.find()

        for (let j = 0; j < allInvoices.length; j++) {
            let customerData = customers[Math.floor(Math.random() * customers.length)];
            console.log(customerData._id)
            await Invoices.findOneAndUpdate({_id: allInvoices[j]._id}, {
                customer: customerData._id
            })
        }
    }
}