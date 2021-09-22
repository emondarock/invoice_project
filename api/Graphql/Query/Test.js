import {googleAuth} from "../../Constant/Config";
import {Customer} from "../../Model/Customers";
import {User} from "../../Model/User";
import {Invoices} from "../../Model/Invoices";
import {InvoiceItems} from "../../Model/InvoiceItems";
import fs from 'fs'

const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(googleAuth.client_id);


export const testQuery = async (parent, args, ctx, req) => {


    return {
        msg: "Done"
    }
}


