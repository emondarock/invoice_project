const {ApolloServer, gql} = require('apollo-server');

export const typeDefs = gql`

    directive @isAuthenticated on FIELD_DEFINITION
    
    enum InvoiceSummaryEnum {
        Customer,
        Date
    }
    
    input InvoicesItemInput{
        itemName: String!,
        itemType: String,
        itemQty: Int!,
        itemUnitPrice: Float!
    }
    
    input CustomerInput{
        customerName: String!,
        customerPhoneNumber: String,
        customerEmail: String,
        customerAddress: String
    }
    
    input InvoiceInput{
        customer: CustomerInput,
        invoiceItems: [InvoicesItemInput],
        discount: Float
    }
    
    
    type msg{
        msg: String
    }

    type MsgWithCode{
        msg: String,
        code: String
        jwt: String
    }

    type User{
        id: ID
        firstName: String,
        lastName: String,
        phoneNo: String,
        email: String,
        isVerified: Boolean,
        updatedAt: String,
        createdAt: String,
        status:String,
        msg: String,
        code: String,
        jwt: String
    }
    
    type InvoiceItems {
        id: ID
        itemName: String,
        itemType: String,
        itemQty: Int,
        itemUnitPrice: Float
        updatedAt: String,
        createdAt: String,
        msg: String,
        code: String,
        jwt: String
    }
    
    type Customer {
        id: ID
        customerName: String,
        customerPhoneNumber: String,
        customerEmail: String,
        customerAddress: String
        updatedAt: String,
        createdAt: String,
        msg: String,
        code: String,
        jwt: String
    }
    
    type Invoices {
        id: ID
        customer: Customer,
        invoiceItems: [InvoiceItems],
        invoiceCreator: User,
        total: Float,
        subTotal: Float,
        discount: Float
        updatedAt: String,
        createdAt: String,
        msg: String,
        code: String,
        jwt: String
    }
    
    type InvoicePagination {
        invoices: [Invoices],
        count: Int,
        msg: String,
        code: String,
        jwt: String
    }
    
    type InvoiceSummary {
        totalItems: Int,
        totalAmount: Float,
        totalInvoice: Int,
        customerName: String,
        date: String
    }
    
#    All Query
    type Query{
        testQuery: msg
        
        ###Invoices
        ShowAllInvoices(limit: Int!, offset: Int!): InvoicePagination @isAuthenticated
        ShowSingleInvoice(invoices_id: ID!): Invoices @isAuthenticated
        
        """Do not use enum if u want to see only the summary""" 
        InvoiceSummary(groupBy: InvoiceSummaryEnum): [InvoiceSummary] @isAuthenticated
    }
    
#    ALL Mutation
    type Mutation{
        testMutation: msg
        
        ###Authentication
        GoogleLoginWithOauth(googleToken: String!): MsgWithCode
        
        ###Invoice
        CreateInvoices(payload: InvoiceInput): MsgWithCode @isAuthenticated
        CreateBulkInvoices: MsgWithCode
    }
`