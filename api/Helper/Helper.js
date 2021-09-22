import {Customer} from "../Model/Customers";
import {Invoices} from "../Model/Invoices";

export const randomIntFromInterval = (min, max) => { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export const addCustomerToInvoice = async () => {
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