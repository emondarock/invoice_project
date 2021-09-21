// import {User} from "../Models/User";
// import {Vendor} from "../Models/Vendor";
// import {Admin} from "../Models/Admin";

const { SchemaDirectiveVisitor } = require("apollo-server-express");
const { defaultFieldResolver } = require("graphql");

class isAuthenticated extends SchemaDirectiveVisitor {
    visitFieldDefinition(field) {
        const { resolve = defaultFieldResolver } = field;

        field.resolve = async function(...args) {
            // extract user from context
            const { user } = args[2];

            if (!user.isVerified){
                return {
                    msg: "Unauthorized",
                    code: "403"
                }
            }

            return resolve.apply(this, args);
        };
    }
}

export {isAuthenticated}