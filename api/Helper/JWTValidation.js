import jwt from 'jsonwebtoken'
import {jwt_config} from "../Constant/Config";

export const verifyJwtToken = async (bearerHeader) => {
    if (typeof bearerHeader !== "undefined") {
        const bearer = bearerHeader.split(" ");
        const jwtToken = bearer[1];


        // console.log(bearerHeader)
        if (!jwtToken) {
            return {
                code: 403
            };
        }


        try {
            let jwtData = {
                jwt: jwtToken
            }
            // console.log(jwtData)
            if (!jwtData){
                jwtData = {
                    jwt: jwtToken
                }
            }
            const data = await jwt.verify(jwtData.jwt, jwt_config.secret_key);
            if (!data) {
                // console.log("error here")
                return {
                    code: "403",
                    msg: "UNAUTHORIZED"
                };
            }


            return data;
        } catch (error) {


            return {
                code: 403,
                msg: "UNAUTHORIZED"
            };
        }
    } else {
        return {
            code: 403,
            msg: "UNAUTHORIZED"
        };
    }
};