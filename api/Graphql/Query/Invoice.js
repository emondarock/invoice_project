import {Invoices} from "../../Model/Invoices";

export const ShowAllInvoices = async (parent, args, ctx, req) => {
    const {limit, offset} = args
    const allInvoices = await Invoices.find({})
        .populate("customer")
        .populate("invoiceItems")
        .populate("invoiceCreator")
        .limit(limit).skip(limit * offset)
    const count = await Invoices.countDocuments()

    return {
        invoices: allInvoices,
        count,
        msg: "SUCCESS",
        code: "200"
    }
}

export const ShowSingleInvoice = async (parent, args, ctx, req) => {
    return Invoices.findOne({_id: args.invoices_id})
        .populate("customer")
        .populate("invoiceItems")
        .populate("invoiceCreator")

}