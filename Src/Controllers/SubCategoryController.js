import { SubCategory } from "../Models/subcategories.js";
import { Category } from "../Models/Category.js";
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import slugify from "slugify";

const insertsubCategory = asyncHandler(async (req, res) => {

    const { name, parentCategory } = req.body
    if (!name) {
        throw new ApiError(400, "Name of Sub Category is Required")

    }
    if (!parentCategory) {
        throw new ApiError(400, "parent category is required")
    }
    const parentCategoryDocument = await Category.findById(parentCategory);
    if (!parentCategoryDocument) {
        throw new ApiError(404, "Parent category not found");
    }
    const exsistingsubCategory = await SubCategory.findOne({ name, parentCategory: parentCategoryDocument._id })
    if (exsistingsubCategory) {
        throw new ApiError(409, "Sub Category already exsist")
    }


    const subCategory = await SubCategory.create({
        name,
        slug: slugify(name),
        parentCategory: parentCategoryDocument._id,
    }
    )
    return res
        .status(201)
        .json(new ApiResponse(201, subCategory, "SubCategory created Successfully"))
})


// fetch getsubcategories
const getsubCategories = asyncHandler(async (req, res) => {
    const subCategories = await SubCategory.aggregate([
        {
            $lookup: {
                from: "categories",
                localField: "parentCategory",
                foreignField: "_id",
                as: "SubCategory"
            }

        },
        {
            $unwind: "$SubCategory"

        },
        {
            $project: {
                _id: 1,
                name: 1,
                slug: 1,
                parentCategory: {
                    _id: "$SubCategory._id",
                    name: "$SubCategory.name",
                },

            }
        }
    ])
    if (!subCategories) {
        throw new ApiError(404, "SubCategory Not Found")
    }

    return res.
        status(200).
        json(new ApiResponse(200, subCategories, "SubCategories Fetched Successfully"))

})


// Edit subCategories


// delete subCategories
const deleteSubCategories = asyncHandler(async (req, res) => {
    const { id } = req.params
    const deleteSubCategories = await SubCategory.findByIdAndDelete(id)
    if (!deleteSubCategories) {
        throw new ApiError(404, "SubCategory Not Found")
    }
    return res
        .status(200)
        .json(new ApiResponse(200, deleteSubCategories, "SubCategories deleted Successfully"))

})
export {
    insertsubCategory,
    getsubCategories,
    deleteSubCategories
}