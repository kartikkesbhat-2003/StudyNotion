const {instance} = require('../config/razorpay')
const Course = require('../models/Course')
const User = require('../models/User')
const mailSender = require('../utils/mailSender')
const {courseEnrollmentEmail} = require('../mail/templates/courseEnrollmentEmail')
const mongoose = require('mongoose');


// capture the payment and initiate the rozerpay order
exports.capturePayment = async (req, res) => {
    
    //get courseId and userID
    const {course_id} = req.body;
    const userId = req.user.id;
    //validation
    //Valid CourseId
    if(!course_id) {
        return res.json({
            success: false,
            message: "Please Provide valid course ID",
        });
    };
    //valid CourseDetail
    let course;
    try {    
        course = await Course.findById(course_id);
        if(!course) {
            return res.json({
                success: false,
                message: 'Could not find the course'
            });
        }

        //user already pay for the same course
        const uid = new mongoose.Type.ObjectId(userId);
        if(course.studentsEnrolled.includes(uid)) {
            return res.status(200).json({
                success: false,
                message: 'Student is already enrolled',
            });
        }

    } catch(error) {
        console.error(error);
        return res.status(500).json({
            successs: false,
            message: error.message,
        });
    }

        // create order;
    const amount = course.price;
    const currency = 'INR';

    const options = {
        amount: amount*100,
        currenct:currency,
        receipt:Math.random(Date.now()).toString(),
        notes:{
            courseId:course_id,
            userId,
        }
    }

    try {
        // initiate the order using razorpay instance
        const paymentResponse = await instance.orders.create(options);
        console.log(paymentResponse);

        return res.status(200).json({
            success:true,
            courseName : course.courseName,
            courseDescription : course.courseDescription,
            thumbnail:course.thumbnail,
            orderId : paymentResponse.id,
            currency:paymentResponse.currency,
            amount:paymentResponse.amount,
        })

    } catch(err) {
        console.error(err);
         return res.status(500).json({
            successs: false,
            message: err.message,
        });
    }
}



// verify signature

exports.verifySignature = async (req, res) => {

    const webHookSecret = "12345678"

    const signature = req.headers["x-razorpay-signature"];

    const shaSum = crypto.createHmac("sha256", webHookSecret);
    shaSum.update(JSON.stringify(req.body));
    const digest = shaSum.digest("hex");

    if(signature === digest){
        
        console.log("Payment is authorized");
        
        const { courseId, userId } = req.body.payload.payment.entity.notes;

        try {

            const enrollledCourse = await Course.findByIdAndUpdate(
                {_id:courseId},
                {$push:{
                    studentsEnrolled:userId,
                }},
                {new:true}
            )

            if(!enrollledCourse) {
                return res.status(500).json({
                    success:false,
                    message:"Course not found",

                })
            }

            console.log("Enrolled course : ", enrollledCourse)

            const enrolledStudent = await User.findByIdAndUpdate(
                {_id : userId},
                {$push:{
                    enrollledCourse:courseId
                }},
                {new:true}
            )

            console.log("Enrolled Student : ", enrolledStudent)

            const emailResponse = await mailSender(
                enrolledStudent.email,
                "Congratulations from codehelp",
                courseEnrollmentEmail(enrollledCourse.courseName, enrolledStudent.firstName),
            )

            return res.status(200).json({
                success:true,
                message:"Signature verified and course added",
            })


        } catch(err) {
            console.error(err);
            return res.status(500).json({
                successs: false,
                message: err.message,
            });
        }

    }

    else {
        return res.status(400).json({
            success:false,
            message:"Invalid request"
        })
    }

}