const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    
    courseName: {
        type:String,
        trim:true,
        required:true,
    },
    courseDescription: {
        type:String,
        required:true,
        trim:true,
    },
    instructor:{ 
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true,
    },
    whatYouWillLearn: {
        type:String,
    },
    courseContent:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Section"
        }
    ],
    ratingAndReviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"RatingAndReview"
        }
    ],
    price:{
        type:Number,
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
    },
    tag: {
        type :[String],
        required:true,
    },
    studentsEnrolled:[
        {
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"User",
        }
    ],
    thumbnail: {
        type:String,
        required:true,
    },
    instructions: {
        type: [String],
    },
    status: {
        type: String,
        enum: ["Draft", "Published"],
    },
    createdAt: {
        type: Date,
        Date: Date.now
    }
    

})

module.exports = mongoose.model("Course", courseSchema);