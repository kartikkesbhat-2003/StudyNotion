const { findOne } = require('../models/Course');
const Profile = require('../models/Profile');
const RatingAndReview = require('../models/RatingAndReview');
const User = require('../models/User')
const {uploadImageToCloudinary} = require('../utils/imageUploader')

exports.updateProfile = async (req, res) => {
    try {
        
        // get data
        const {dateOfBirth="", about="", contactNumber, gender} = req.body;

        // get userid
        const id = req.user.id;

        // find profile
        const userDetails = await User.findById(id);
        const profile = await Profile.findById(userDetails.additionalDetails);

        //update profile fields
        profile.dateOfBirth = dateOfBirth;
        profile.about = about;
        profile.contactNumber = contactNumber;
        profile.gender = gender;

        await profile.save();

        return res.status(200).json({
            success:true,
            message:"Profile details updated successfully",
            profile,
        })


    } catch(err) {
        return res.status(500).json(
            {
                success:false,
                message:"Error while updating profile details",
                error:err.message,
            }
        )
    }
}


// delete account

exports.deleteAccount = async (req, res) => {
    try {
        //TODO: Find More on Job Schedule
        //Const job = schedule.scheduleJob('10 * * * * *', function () {
        //    console.log('The answer to life');
        //})
        //console.log(job);
        // console.log('Printing ID: ', req.user.id);

        //get id
        const id = req.user.id;
        //validation of id
        const user = await User.findById({_id: id})
        //delete profile
        if(!user) {
            return res.status(404).send({
                success: false,
                message: 'User Not Found',
            });
        }
        //delete associated profile with user
        await Profile.findByIdAndDelete({_id: user.additionalDetails});
        //TODO: HW unenroll user form all enroled courses
        //Now delete user
        await User.findByIdAndDelete({_id:id});
        //return response
        return res.status(200).json({
            success: true,
            message: 'User Deleted Successfully',
        });

    } catch(error) {
        return res
            .status(500)
            .json({
            success: false,
            message: 'User Cannot Be Deleted',
            error: error.message,
        });
    }
}

exports.getAllUserDetails = async (req, res) => {
    try {
        const id = req.user.id;

        const userDetails = await User.findById(id).populate("additionalDetails").exec();

        res.status(200).json({
            success:true,
            message:"User data fetched successfully",
            data : userDetails,  
        })
    } catch(err) {
        return res.status(500).json(
            {
                success:false,
                message:"Error while getting user data",
                error:err.message,
            }
        )
    }
}

exports.updateDisplayPicture = async (req, res) => {
    try {
        const displayPicture = req.files.displayPicture;
        const userId = req.user.id;
        const image = await uploadImageToCloudinary(
            displayPicture,
            process.env.FOLDER_NAME,
            1000,
            1000
        )
        console.log(image);
        const updatedProfile = await User.findByIdAndUpdate(
            {_id: userId},
            {image: image.secure_url},
            {new: true}
        )
        res.send ({
            success: true,
            message: `Image Updated Successfully`,
            data: updatedProfile,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.getEnrolledCourses = async (req, res) => {
    try {
        const userId = req.user.id;
        const userDetails = await User.findOne({
            _id: userId,
        })
        .populate('courses')
        .exec()

        if(!userDetails) {
            return res.status(400).json({
                success: false,
                message: `Could Not Find User With Id: ${userDetails}`,
            });
        }
        return res.status(200).json({
            success: true,
            data: userDetails.courses,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};