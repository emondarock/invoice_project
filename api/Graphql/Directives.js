// import {User} from "../Models/User";
// import {Vendor} from "../Models/Vendor";
// import {Admin} from "../Models/Admin";

const { SchemaDirectiveVisitor } = require("apollo-server-express");
const { defaultFieldResolver } = require("graphql");

class isAuthenticated extends SchemaDirectiveVisitor {
    // visitFieldDefinition(field) {
    //     const { resolve = defaultFieldResolver } = field;
    //
    //     field.resolve = async function(...args) {
    //         // extract user from context
    //         const { user } = args[2];
    //         console.log("USER", user)
    //         let userData
    //         if (user.userType === 'User'){
    //             userData = await User.findOne({_id: user._id})
    //         }
    //
    //         if (user.userType === 'Vendor'){
    //             userData = await Vendor.findOne({_id: user._id})
    //         }
    //
    //         if (user.userType === 'Admin'){
    //             userData = await Admin.findOne({_id: user._id})
    //         }
    //         console.log(userData)
    //         if (!userData){
    //             return {
    //                 msg: "Unauthorized",
    //                 code: UNAUTHORIZE
    //             }
    //         }
    //         if (user.tokenType === 'SignUp'){
    //             if (userData.status !== 'Pending' && userData.status !== 'Active' ){
    //                 return {
    //                     msg: "Unauthorized",
    //                     code: UNAUTHORIZE
    //                 }
    //             }
    //         }
    //         else {
    //             if (userData.status !== 'Active'){
    //                 return {
    //                     msg: "Unauthorized",
    //                     code: UNAUTHORIZE
    //                 }
    //             }
    //
    //             if (user.status === 403) {
    //                 return {
    //                     msg: "Unauthorized",
    //                     code: UNAUTHORIZE
    //                 }
    //             }
    //         }
    //
    //         return resolve.apply(this, args);
    //     };
    // }
}

export {isAuthenticated}