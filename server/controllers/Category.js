const Category = require('../models/Category')

exports.createCategory = async (req, res) => {
    try {

        // fetch data
        const {name, description} = req.body;

        // validate
        if(!name || ! description) {
            return res.status(400).json(
                {
                    success:false,
                    message:"Please enter all the feilds"
                }
            )
        }
        
        // create entry in DB
        const categoryDetails = await Category.create({
            name:name,
            description:description
        })

        return res.status(200).json({
            success:true,
            categoryDetails,
            message:"Category created successfully"
        })

    } catch (err) {
        return res.status(500).json(
            {
                success:false,
                message:"Error while creating category",
                error:err.message,
            }
        )
    }
}


exports.showAllCategories = async (req, res ) => {
    try {

        const allCategories = await Category.find({}, {name:true, description:true});

        res.status(200).json({
            success:true,
            message:"All tags returned successfully",
            data:allCategories
        })
        
    } catch(err) {
        return res.status(500).json(
            {
                success:false,
                message:"Error while fetching all tags",
                error:err.message,
            }
        )
    }
}

exports.categoryPageDetails = async (req, res) => {
    try {
        //get categoryId
        const {categoryId} = req.body;
        //get courses for specified categoryId
        const selectedCategory = await Category.findById(categoryId)
                                        .populate("courses")
                                        .exec();
        //validation
        if(!selectedCategory) {
            return res.status(404).json({
                success: false,
                message: "Data Not Found",
            });
        }
        //get courses for different categories
        const differentCategories = await Category.find({
                                    _id:  {$ne: categoryId},
                                    })
                                    .populate("courses")
                                    .exec();

        //get top selling courses 
        //HW - write it on your own

        //return response
        return res.status(200).json({
            success: true,
            data: {
                selectedCategory,
                differentCategories,
            }
        })

    } catch(error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}