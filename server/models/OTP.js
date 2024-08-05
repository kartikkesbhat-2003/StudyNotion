const mongoose = require('mongoose');
const mailSender = require('../utils/mailSender');
const otpTemplate = require('../mail/templates/emailVerificationTemplate')

const OTPSchema = new mongoose.Schema({
    
    email: {
        type:String,
        required:true,
    },
    otp:{
        type:String,
        required:true,
    },
    createdAt: {
        type:Date,
        default:Date.now,
        expires:5*60,
    }

})

async function sendVerificationEmail(email, otp) {
    try {
        const mailResponse = await mailSender(email, "Verification mail from StudyNotion", otpTemplate(otp))
        console.log("Email sent successfully : ", mailResponse);
        
    } catch(err) {
        console.log("Error occured while sending mail : ", err);
        throw err;
    }
}

OTPSchema.pre("save", async function(next) {
    console.log("New document saved to the database");

    //only send an email when a new document is created 
    if(this.isNew) {
        await sendVerificationEmail(this.email, this.otp);
    }
    next();
})

module.exports = mongoose.model("OTP", OTPSchema);