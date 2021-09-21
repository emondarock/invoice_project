import {jwt_config} from "../Constant/Config";
import jwt from "jsonwebtoken";

export const createJWT = (payload) => {
    return jwt.sign(
        {
            iss: "TestInterView",
            ...payload,
            iat: new Date().getTime(),
            exp: new Date().setDate(new Date().getDate() + 1)
        },
        jwt_config.secret_key
    );
};
