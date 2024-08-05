const User = require('../models/User')
const mailSender = require('../utils/mailSender')
const bcrypt = require('bcrypt')
const crypto = require('crypto')


// reset passsword token
exports.resetPasswordToken = async (req, res) => {
    try {
        // get email from request body
        const email = req.body.email;

        // email validation
        const user = await User.findOne({email:email});

        if(!user) {
            return res.status(401).json({
                success : false,
                message :"User not found ",
            })
        }

        // generate token
        const token = crypto.randomBytes(20).toString('hex');

        const updatedDetails = await User.findOneAndUpdate({email:email},
                                                            {
                                                                token:token,
                                                                recentPasswordExpires:Date.now() + 3600000,
                                                            },
                                                            {new : true}
        )

        // generate link
        const url = `https://localhost:3000/update-password/${token}`

        await mailSender(email,
            "Password reset link",
            `Your link for email verification is ${url}. Please click this url to reset your password.`
        )

        return res.status(200).json(
            {
                success:true,
                message:"Password reset mail sent successfully"
            }
        )


    } catch(err) {
        console.log(err)
        return res.status(500).json(
            {
                success:false,
                message: "Something went wrong while reseting passweord"
            }
        )
    }
}


// reset password
exports.resetPassword = async (req, res) => {
    try {
        // fetch data
        const { password, confirmPassword, token } = req.body;

        // validate
        if(password !== confirmPassword) {
            return res.json(
                {
                    success:false,
                    message: "Password not matching",
                }
            )
        }

        // get user details from db using token 
        const userDetails = await User.findOne({token:token})

        // if no entry - invalid token
        if(!userDetails) {
            return res.json(
                {
                    success:false,
                    mesasge: "Invalid token"
                }
            )
        }

        // token time check
        if(userDetails.recentPasswordExpires < Date.now()) {
            return res.json({
                success:false,
                message:"Token expired"
            })
        }

        // hash password
        const hashedPass = await bcrypt.hash(password, 10);

        // update password
        await User.findOneAndUpdate(
            {token:token},
            {password:hashedPass},
            {new: true}
        );

        // return response
        return res.status(200).json(
            {
                success:true,
                message:"Password reset successful"
            }
        )

    } catch(err) {
        return res.status(500).json(
            {
                success:false,
                message:"Password reset faled try again later",
                error:err.message,
            }
        )
    }
}