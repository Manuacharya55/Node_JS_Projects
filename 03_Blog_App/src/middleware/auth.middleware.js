import jwt from "jsonwebtoken"
import {ApiError} from "../utils/ApiError.js"
import User from "../models/user.model.js"
import { asyncHandler } from "../utils/AsyncHandler.js"

const verifyJwt =asyncHandler( async (req,res,next) =>{
    try {
        const token = req.cookies?.logintoken

    if(!token){
        res.redirect("/blogify/login")
    }
    
    const decodedJwt = jwt.verify(token,"thisisasecretkeyforblogwebsite")
    const user = await User.findById(decodedJwt._id).select("-password");

    if(!user){
        throw new ApiError(400,"Invalid access token")
    }
    req.user = user;
    next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }
})

export {verifyJwt}