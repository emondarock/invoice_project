import {testMutation} from "./Test";
import {GoogleLoginWithOauth} from "./UserAuthentication";
import {CreateBulkInvoices, CreateInvoices} from "./Invoices";

export const Mutation = {
    testMutation,

    //Authentication
    GoogleLoginWithOauth,

    //Invoice
    CreateInvoices,
    CreateBulkInvoices
}