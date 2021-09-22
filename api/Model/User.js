import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';

const UserSchema = new Schema({
    firstName: {
        type: String,
        trim: true
    },
    lastName: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
    },
    phoneNo: {
        type: String,
        lowercase: true,
        trim: true,
    },
    isVerified:{
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        default: "Active"
    },
    password: String,
    loginType: {
        type: String,
        enum: ['Google', 'Facebook', 'Email'],
        default: 'Google'
    }
})

UserSchema.plugin(timestamps);

UserSchema.index({ createdAt: 1, updatedAt: 1});


export const User = mongoose.model('User', UserSchema);