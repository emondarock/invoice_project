import mongoose, { Schema } from 'mongoose';
import timestamps from "mongoose-timestamp";

const CustomerSchema = new Schema({
    customerName: String,
    customerPhoneNumber: String,
    customerEmail: String,
    customerAddress: String
})

CustomerSchema.plugin(timestamps);

CustomerSchema.index({ createdAt: 1, updatedAt: 1});


export const Customer = mongoose.model('Customer', CustomerSchema);