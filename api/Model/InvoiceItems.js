import mongoose, { Schema } from 'mongoose';
import timestamps from "mongoose-timestamp";

const InvoiceItemsSchema = new Schema({
    itemName: String,
    itemType: String,
    itemQty: Number,
    itemUnitPrice: Number
})


InvoiceItemsSchema.plugin(timestamps);

InvoiceItemsSchema.index({ createdAt: 1, updatedAt: 1});


export const InvoiceItems = mongoose.model('InvoiceItems', InvoiceItemsSchema);