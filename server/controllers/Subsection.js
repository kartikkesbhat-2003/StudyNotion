const SubSection = require('../models/SubSection');
const Section = require('../models/Section');
const {uploadImageToCloudinary} = require('../utils/imageUploader')
require('dotenv').config();

exports.createSubSection = async (req, res) => {
    try {
        // FETCH DATA FROM REQEST BODY
        const {sectionId, title, description } = req.body;

        // EXTRACT FILE/VIDEO
        const video = req.files.videoFile;

        // VALIDATION
        if(!sectionId || !title || !description || !video){
            return res.status(400).json({
                success:false,
                message:"All feilds required"
            })
        }

        // UPLOAD VIDEO TO CLOUDINARY
        const subsectionVideo = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);

        // CREATE A SUBSECTION
        const newSubsection = await SubSection.create(
            {
                title:title, 
                timeDuration:`${subsectionVideo.duration}`,
                description:description,
                videoUrl:subsectionVideo.secure_url,
            }
        )

        // UPDATE SECTION WITH THIS SUBSECTION
        const updatedSection = await Section.findByIdAndUpdate({_id:sectionId},{$push:{subSection:newSubsection._id}}, {new:true}).populate("subSection")

        // RETURN RESPONSE
        return res.status(200).json({
            success:true,
            message:"Subsection created successfully",
            data: updatedSection,
        })

    } catch(err) {
        return res.status(500).json(
            {
                success:false,
                message:"Error while creating subsection",
                error:err.message,
            }
        )
    }
}

// update usbsection

exports.updateSubSection = async (req, res) => {
    try {
        const {sectionId, title, description} = req.body;
        const subSection = await SubSection.findById(sectionId);

        if(!subSection) {
            return res.status(404).json({
                success: false,
                message: "SubSection not found",
            });
        }

        if(title !== undefined) {
            subSection.title = title;
        }

        if(description !== undefined) {
            subSection.description = description;
        }

        if(req.files && req.files.video !== undefined) {
            const video = req.files.video;
            const uploadDetails = await uploadImageToCloudinary(
                video,
                process.env.FOLDER_NAME,
            )
            subSection.videoUrl = uploadDetails.secure_url;
            subSection.timeDuration = `${uploadDetails.duration}`
        }

        await subSection.save();

        return res.json({
            success: true,
            message: "Section updated Successfully"
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while updating the section",
        })
    }
};



// delete subsection

exports.deleteSubSection = async (req, res) => {
    try {
        const {subSectionId, sectionId} = req.body;
        await Section.findByIdAndUpdate(
            {_id: sectionId},
            {
                $pull: {
                    subSection: subSectionId,
                },
            }
        )
        const subSection = await SubSection.findByIdAndDelete({ _id: subSectionId });

        if(!subSection) {
            return res
                .status(404)
                .json({
                    success: false,
                    message: "SubSection Not Found",
                })
        }

        return res.json({
            success: true,
            message: "SubSection Deleted Successfully",
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "An Error Occurred While Deleting the SubSection",
        })
    }
}