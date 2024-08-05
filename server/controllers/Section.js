const Section = require('../models/Section')
const Course = require('../models/Course')

exports.createSection = async (req, res) => {
    try {
        
        const {sectionName, courseId} = req.body;

        if(!sectionName || !courseId){
            return res.status(400).json({
                success:false,
                message:"Please input the subsection feild"
            })
        }

        const newSection = await Section.create({sectionName:sectionName, courseId:courseId});

        const updatedCourse = await Course.findByIdAndUpdate(
            courseId,
            {
                $push: {
                    courseContent:newSection._id,
                }
            },
            {new:true}
        )
        .populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            },
        })
        .exec(); 

        return res.status(200).json({
            success:true,
            message:"Section created successfully",
            updatedCourse,
        })


    } catch(err) {
        return res.status(500).json(
            {
                success:false,
                message:"Error while creating section",
                error:err.message,
            }
        )
    }
}

exports.updateSection = async (req, res) => {
    try {

        const {sectionName, sectionId} = req.body;

        if(!sectionName || !sectionId) {
            return res.status(400).json({
                success:false,
                message:"Missing properties"
            })
        }

        const updatedSection = await Section.findByIdAndUpdate(
            sectionId,
            {sectionName},
            {new:true}
        )

        res.status(200).json({
            success:true,
            message:"Section updated successfully",
            data:updatedSection
        })



    } catch(err) {
        return res.status(500).json(
            {
                success:false,
                message:"Error while updating section",
                error:err.message,
            }
        )
    }
}


exports.deleteSection = async (req, res) => {
    try {

        
        const {sectionId, courseId} = req.body;
        
        await Course.findByIdAndUpdate({_id:courseId},
            {
                $pull:{
                    courseContent:sectionId
                }
            }
        );

        
        await Section.findByIdAndDelete({_id:sectionId});

        res.status(200).json({
            success:true,
            message:"Section deleted successfully",
        })


    } catch(err) {
        return res.status(500).json(
            {
                success:false,
                message:"Error while deleting section",
                error:err.message,
            }
        )
    }
}