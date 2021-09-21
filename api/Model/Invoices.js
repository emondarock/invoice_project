import mongoose, { Schema } from 'mongoose';
import timestamps from "mongoose-timestamp";

const InvoicesSchema = new Schema({
    customer: {
        type: Schema.Types.ObjectID,
        ref: "Customer"
    },
    invoiceItems: [{
        type: Schema.Types.ObjectID,
        ref: "InvoiceItems"
    }],
    invoiceCreator: {
        type: Schema.Types.ObjectID,
        ref: "User"
    },
    total: Number,
    subTotal: Number,
    discount: Number
})


InvoicesSchema.plugin(timestamps);

InvoicesSchema.index({ createdAt: 1, updatedAt: 1});


export const Invoices = mongoose.model('Invoices', InvoicesSchema);