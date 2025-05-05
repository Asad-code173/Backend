import {Category} from "../Models/Category.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import slugify from "slugify"

// insertion 

const insertCategory = asyncHandler(async (req, res) => {
    try {
        const { name } = req.body;
        
        if (!name) {
            throw new ApiError("This is required")
        }
        const exisitedCategory = await Category.findOne({ name })

        if (exisitedCategory) {
            throw new ApiError(409, "Category Already exsist");
        }
        const createNewCategory = await Category.create({name,slug:slugify(name)})

        return res
            .status(201)
            .json(new ApiResponse(200, createNewCategory, "Category created Successfully"));

    } catch (error) {
        console.log("Error " + error);

    }
})


// retriving category

const getCategory = asyncHandler(async (req, res) => {

    const categories = await Category.find({});

    // Check if categories were found
    if (!categories || categories.length === 0) {
        throw new ApiError(404, "No Categories Found")
    }

    return res
        .status(201)
        .json(new ApiResponse(200, categories, "Categories fetched  Successfully"));

});

// get single category
const getSingleCategory = asyncHandler(async (req, res) => {
    const singleCategory = await Category.findOne({ slug: req.params.slug });

  
    if (!singleCategory) {
        throw new ApiError(404, "Category not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, singleCategory, "Category fetched successfully"));
});



// updating category
const updateCategory = asyncHandler(async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;
        const category = await Category.findByIdAndUpdate
            (id,
                { name, slug: slugify(name) },
                { new: true }
            )
        if (!category) {
            throw new ApiError(500, "Some thing went wrong while updating Category")
        }
        return res
            .status(201)
            .json(new ApiResponse(200, category, "Category updated Successfully"));
    } catch (error) {
        console.log(error);

    }

})
// delete category

const deleteCategory = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findByIdAndDelete(id);
        if (!category) {
            throw new ApiError(404, "Category not found");
        }
        return res
            .status(200)
            .json(new ApiResponse(200, "Category deleted successfully"));
    } catch (error) {
        console.log("Error in deleting category", error);

    }
});



export {
    insertCategory,
    getCategory,
    updateCategory,
    deleteCategory,
    getSingleCategory
}


