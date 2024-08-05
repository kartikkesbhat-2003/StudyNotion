const jwt = require('jsonwebtoken')
const User = require("../models/User");
require('dotenv').config();

// auth
exports.auth = async (req, res, next) => {
    try {
        // extract token
        const token = req.cookies.token || req.body.token || req.header("Authorization").replace('Bearer ', '');

        // /if token missing
        if(!token) {
            return res.ststus(401).json(
                {
                    success:false,
                    message:"Token is missing"
                }
            )
        }

        // verify the token
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET)
            console.log(decode);
            req.user = decode;
        } catch(err) {
            console.log(err)
            return res.status(401).json(
                {
                    success:false,
                    message:"Token is invalid"
                }
            )
        }

        next();

    } catch(err) {
        console.log(err)
        return res.status(500).json(
            {
                success:false,
                message:"Something went wrong while token validating",
                error:err.message,
            }
        )
    }
}


// isStudent
exports.isStudent = async (req, res,next) => {
    try {

        if(req.user.accountType !== "Student") {
            return res.status(401).json(
                {
                    success:false,
                    message:"This is a protected route for student only"
                }
            )
        }

        next();
        
    } catch(err) {
        return res.ststus(500).json(
            {
                success:false,
                message:"User role cannot be verified",
                error:err.message,
            }
        )
    }
}


// isInstructor
exports.isInstructor = async (req, res,next) => {
    try {

        if(req.user.accountType !== "Instructor") {
            return res.status(401).json(
                {
                    success:false,
                    message:"This is a protected route for Instructor only"
                }
            )
        }

        next();
        
    } catch(err) {
        return res.ststus(500).json(
            {
                success:false,
                message:"User role cannot be verified",
                error:err.message,
            }
        )
    }
}


// isAdmin
exports.isAdmin = async (req, res,next) => {
    try {

        if(req.user.accountType !== "Admin") {
            return res.status(401).json(
                {
                    success:false,
                    message:"This is a protected route for Admin only"
                }
            )
        }

        next();
        
    } catch(err) {
        return res.ststus(500).json(
            {
                success:false,
                message:"User role cannot be verified",
                error:err.message,
            }
        )
    }
}