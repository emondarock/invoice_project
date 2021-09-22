# invoice_project
## Installation

```python
npm install
npm run build
npm run start

#For dev mode
npm run dev

```

## Important
I have sent the .env file via mail. It will be needed for google authentication

## Queries

```python
# Google Auth
mutation{
  GoogleLoginWithOauth(googleToken: "eyJhbGciOiJSUzI1NiIsImtpZCI6ImMzMTA0YzY4OGMxNWU2YjhlNThlNjdhMzI4NzgwOTUyYjIxNzQwMTciLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI2MDAwOTUzNjIyNjgtY3Jlam1rNHY3ZWwybGpudmNkMG5kMDNobmdkcjBmZTQuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI2MDAwOTUzNjIyNjgtY3Jlam1rNHY3ZWwybGpudmNkMG5kMDNobmdkcjBmZTQuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDQzODQ2NTY0MDM0MDA0MDA3MzIiLCJlbWFpbCI6ImVtb25kYXJvY2tAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJ1UTNhQ2RFV1cweGdvNC1KZzMweXB3IiwibmFtZSI6IkVtb24gUmVqYSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQVRYQUp6NlRrWUpSLXdTZExIMkZEVlZhSjNIN3lDNzYtX1pYOF9FMGJQSD1zOTYtYyIsImdpdmVuX25hbWUiOiJFbW9uIiwiZmFtaWx5X25hbWUiOiJSZWphIiwibG9jYWxlIjoiZW4iLCJpYXQiOjE2MzIzMDAwNzEsImV4cCI6MTYzMjMwMzY3MX0.NdTRprhwS2c_I9mfJBx02oo5P4svoOQChzjyRyhu0MeIHAeD4OE6oZeu_H0zF_ehJDpOjQxI18sSLZdP3qnhsGuJTXJ38HLOD4Qk1lh6H__CCYkEIrnVg0wxhARS3hlmgpKP7Jr3dqFIREbRtN6gm-xLDuZK645MkOLmZt2uUNk7khnAX0l4AK_ksfSfyNymNOyrzoIRW3b4KXvBPhYUn-iK76Ajkds2jiacHDfHj68GThNhKcYA2KWzZCFdWyMQQNr2wYv_eAwF4NRhiZk2Sg-x_55moqEogLwbBHA2_VY6RX2WD8oqBiEll4cl1U1ismZ90MDgAoPkerCBJd-d3w"){
    msg
    code
    jwt
  }
}

# Create Invoice
mutation{
  CreateInvoices(payload: {
    customer: {
      customerName: "Emon",
      customerEmail: "asda@as.com"
      customerPhoneNumber: "123456",
      customerAddress: "klasjd"
    },
    invoiceItems: [
      {
        itemName: "Pen",
        itemType: "Book",
        itemQty: 5,
        itemUnitPrice:10
      }
    ]
  }){
    msg
  }
}

# Invoice Summary
query{
  InvoiceSummary(groupBy: Customer){
    totalItems
    totalAmount
    totalInvoice
    customerName
    date
  }
}

Use Date for summary based on date. And dont use anything in args if you want to see whole summary

# Create Bulk Random Invoice
mutation{
  CreateBulkInvoices{
    msg
  }
}

```
