import {Invoices} from "../../Model/Invoices";

export const ShowAllInvoices = async (parent, args, ctx, req) => {
    const {limit, offset} = args
    const allInvoices = await Invoices.find({})
        .populate("customer")
        .populate("invoiceItems")
        .populate("invoiceCreator")
        .limit(limit).skip(limit * offset).sort({_id: -1})
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

export const InvoiceSummary = async (parent, args, ctx, req) => {
    const {groupBy} = args

    let group = {
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
    }

    let project = {
        totalItems: 1,
        totalAmount: 1,
        totalInvoice: 1
    }

    let data = {}

    if (groupBy === "Customer") {
        group._id = "$customer_info.customerName"
        project.customerName = "$_id"
        return await Invoices.aggregate()
            .lookup({
                from: "customers",
                localField: "customer",
                foreignField: "_id",
                as: "customer_info",

            }).unwind("$customer_info")
            .group(group)
            .project(project)
    }
    else if (groupBy === "Date") {

        group._id = {  day: { $dayOfYear: "$createdAt"}}
        group.first = {$min: "$createdAt"}
        project.date = "$first"

        return Invoices.aggregate()
            .group(group)
            .sort({_id: -1})
            .project(project)
    }else {
        group._id = null
        const invoiceSummary =  await Invoices.aggregate()
            .group(group)
            .project(project)
        console.log(invoiceSummary)
        return invoiceSummary
    }


}