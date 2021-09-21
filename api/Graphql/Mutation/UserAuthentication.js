import {googleAuth} from "../../Constant/Config";
import {createJWT} from "../../Helper/JWTCreator";
import {User} from "../../Model/User";

const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(googleAuth.client_id);

export const GoogleLoginWithOauth = async (_,args, ctx,req) => {
    const ticket = await client.verifyIdToken({
        idToken: args.googleToken,
        audience: googleAuth.client_id,
    });
    const payload = ticket.getPayload();
    console.log(payload)
    if (payload.email_verified){
        const newUser = new User({
            firstName: payload.name.split(' ')[0],
            lastName: payload.name.split(' ')[1],
            email: payload.email,
            isVerified: payload.email_verified,
        })
        await newUser.save()
        const jwt = await createJWT({
            _id: newUser._id,
            email: newUser.email,
            isVerified: payload.email_verified
        })

        return {
            msg: "Google auth verification success",
            code: "SUCCESS",
            jwt: jwt
        }
    }
    return {
        msg: "Google auth verification failed",
        code: "ERROR",
    }
}