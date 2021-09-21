import {googleAuth} from "../../Constant/Config";

const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(googleAuth.client_id);

export const testQuery = async(parent, args, ctx, req)=>{
    const ticket = await client.verifyIdToken({
        idToken: `eyJhbGciOiJSUzI1NiIsImtpZCI6ImMzMTA0YzY4OGMxNWU2YjhlNThlNjdhMzI4NzgwOTUyYjIxNzQwMTciLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI2MDAwOTUzNjIyNjgtY3Jlam1rNHY3ZWwybGpudmNkMG5kMDNobmdkcjBmZTQuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI2MDAwOTUzNjIyNjgtY3Jlam1rNHY3ZWwybGpudmNkMG5kMDNobmdkcjBmZTQuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDQzODQ2NTY0MDM0MDA0MDA3MzIiLCJlbWFpbCI6ImVtb25kYXJvY2tAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJndVZQbGx2OXV5LURsdVRiS2Q5Q3BRIiwibmFtZSI6IkVtb24gUmVqYSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQVRYQUp6NlRrWUpSLXdTZExIMkZEVlZhSjNIN3lDNzYtX1pYOF9FMGJQSD1zOTYtYyIsImdpdmVuX25hbWUiOiJFbW9uIiwiZmFtaWx5X25hbWUiOiJSZWphIiwibG9jYWxlIjoiZW4iLCJpYXQiOjE2MzIyMzg3NjUsImV4cCI6MTYzMjI0MjM2NX0.MlWRvd0iVPxq4-LvvWeJ1vB5zqmokVc5iifR6B2yJv0m0O9ICbli7S1fCunvsfUfES_1ETUadr-9JPTMX_lwEW0A2xLWth_UbrB2E2nZde2qUtKSBEH8bSV9P-itom03jPbn4FPfjA_YamLmBn3LDkB0WLNbFoSCA31GeyNayytMiFG3ZpC2GTSdjZqrPi3QQ1by9S3fcpuGf9oMIGhBRNi1HHx_bDBc2fugEa4Ccarwg1nHLAvbBRREuRLAmZzU4l40ktPlJN6opY5xvtjugfcUn9_oxcNDYyAtHqQmZNhARlDct2hN8-HHrJ5X5cSDpem_9zOmJcTKDDSYoqXmsA`,
        audience: googleAuth.client_id,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    console.log(payload)
    return {
        msg: payload.name
    }
}