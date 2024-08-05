const Course = require('../models/Course')
const Category = require('../models/Category')
const User = require('../models/User'); 
const {uploadImageToCloudinary} = require('../utils/imageUploader')
require('dotenv').config();

exports.createCourse = async (req, res) => {
    try {

        // fetch data
        let {
            courseName, 
            courseDescription, 
            whatYouWillLearn, 
            price, 
            tag,
            category,   
            status,
            instructions,
        } = req.body;

        // fetch thumbnail image
        const thumbnail = req.files.thumbnailImage; 

        // validation 
        if(!courseName || 
            !courseDescription || 
            !whatYouWillLearn || 
            !price || 
            !category || 
            !tag ||
            !thumbnail
        ) {
            return res.status(400).json({
                success:false,
                message:"All feilds required"
            })
        }

        if(!status || status === undefined) {
            status = "Draft";
        }

        
        // check for instructor
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId, {
            accountType: "Instructor",
        });;
        console.log("Instructor details", instructorDetails);

        if(!instructorDetails) {
            return res.status(404).json({
                success:false,
                message:"Instructor not found"
            })
        }

        //  check given category is valid or not
        const categoryDetails = await Category.findById(category);

        if(!categoryDetails) {
            return res.status(404).json({
                success:false,
                message:"Category not found"
            })
        }

        // upload image to cloudinary
        const thumbnailImg = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);

        const newCourse = await Course.create(
            {
                courseName,
                courseDescription,
                tag:tag,
                instructor: instructorDetails._id,
                whatYouWillLearn:whatYouWillLearn,
                price:price,
                category:categoryDetails.id,
                thumbnail:thumbnailImg.secure_url,
                status: status, 
                instructions: instructions,
            }
        )

        // add the new course to the user schema of instructor
        await User.findByIdAndUpdate(
            {_id:instructorDetails._id},
            {$push: {courses:newCourse._id}},
            {new:true}
        )

        // update the category schema
        await Category.findByIdAndUpdate(
            {_id:category},
            {
                $push: {
                    courses:newCourse._id
                }
            },
            {new:true}
        )

        res.status(200).json({
            success: true,
            data: newCourse,
            message: "Course Created Successfully",
        });


    } catch(err) {
        return res.status(500).json(
            {
                success:false,
                message:"Failed to create course",
                error:err.message,
            }
        )
    }
}


// show all courses
exports.getAllCourses = async (req, res) => {
    try {

        const allCourses = await Course.find({}, 
            {
                courseName:true,
                price:true,
                thumbnail:true,
                instructor:true,
                ratingAndReviews:true,
                studentsEnrolled:true
            }
        )
        .populate("instructor").exec();

        res.status(200).json({
            success:true,
            message: "Data for all courses fetched successfully",
            data:allCourses, 
        })

    } catch(err) {
        return res.status(500).json(
            {
                success:false,
                message:"Error while fetching all the courses",
                error:err.message,
            }
        )
    }
}

exports.getCourseDetails = async (req, res) => {
    try {
        //get id
        const {courseId} = req.body;
        //find course details
        const courseDetails = await Course.find(
            {_id:courseId}
        )
        .populate(
            {
                path: "instructor",
                populate:{
                    path: "additionalDetails",
                },
            }
        )
        .populate("category")
        // .populate("ratingAndReviews")
        .populate({
            path: "courseContent",
            populate:{
                path: "subSection",
            },
        })
        .exec();

        //validation
        if(!courseDetails) {
            return res.status(400).json({
                success: false,
                message: `Could not find the course with ${courseId}`,
            });
        }

        //return response
        return res.status(200).json({
            success: true,
            message: "Course Details Fetched Successfully",
            data: courseDetails,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};