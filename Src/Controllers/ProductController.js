import { Products } from "../Models/Products.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import slugify from "slugify"
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/Cloudinary.js"
import { Category } from "../Models/Category.js"


const createProduct = asyncHandler(async (req, res) => {

    console.log(req.body)
    let { name, description, category, variants } = req.body
    if (typeof variants === "string") {
        variants = JSON.parse(variants)
    }
    // category ID 67a51fd5d04f0ad39980c72a


    if (!name || !description || !category || !Array.isArray(variants)) {
        throw new ApiError(400, "This field is required")
    }

    for (const variant of variants) {
        if (!variant.size || !variant.price || !variant.stock) {
            throw new ApiError(400, "Each Variant must have size price and stock")

        }

    }

    // check for Image
    const photoLocalPath = req.file?.path;
    console.log(photoLocalPath);

    if (!photoLocalPath) {
        throw new ApiError(400, "Photo is Required");
    }

    const photoFile = req.file;
    // console.log(photoFile);

    const maxFileSize = 2 * 1024 * 1024; // 2 MB
    if (photoFile.size > maxFileSize) {
        throw new ApiError(400, "Image size must be less than 2 MB");

    }
    const photo = await uploadOnCloudinary(photoLocalPath)
    if (!photo) {
        throw new ApiError(500, "Failed to upload photo. Please try again.");
    }

    // console.time("MongoDb Query time End")
    const existingCategory = await Category.findById(category);
    if (!existingCategory) {
        throw new ApiError(404, "Category not found. Please provide a valid category.");

    }
    // console.timeEnd("MongoDb Query time End")

    // console.time("MongoDb Query time Start")
    const exsistingproduct = await Products.findOne({ name })
    if (exsistingproduct) {
        throw new ApiError(409, "Product already exsist")

    }
    // console.timeEnd("MongoDb Query time Start")

    const product = await Products.create({
        name,
        description,
        category: existingCategory._id,
        variants,
        slug: slugify(name),
        photo: photo.url
    })
    return res
        .status(201)
        .json(new ApiResponse(200, product, "Product created Successfully"));

})


const getProducts = asyncHandler(async (req, res) => {
    try {

        const products = await Products.aggregate([
            {
                $lookup: {
                    from: "categories",
                    localField: "category",
                    foreignField: "_id",
                    as: "Productsdetails"  // alias name

                }
            },
            {
                $unwind: "$Productsdetails"
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    description: 1,
                    slug: 1,
                    variants: 1,
                    photo: 1,
                    category: "$Productsdetails.name" // Replace category ID with name
                }
            }

        ])
        if (!products) {
            throw new ApiError(404, "Product Not Found")
        }
        return res
            .status(201)
            .json(new ApiResponse(200, products, "products fetched  Successfully"));
    } catch (error) {
        console.log("Error in Fetching  the Products", error);
        return res.status(500).json(new ApiError(500, "Internal Server Error"));

    }


})
const getSingleProduct = asyncHandler(async (req, res) => {

    try {
        const singleProduct = await Products.aggregate([
            {
                $lookup: {
                    from: "categories",
                    localField: "category",
                    foreignField: "_id",
                    as: "productDetail"
                },

            },
            {
                $unwind: {
                    path: "$productDetail"
                },


            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    description: 1,
                    slug: 1,
                    variants: 1,
                    photo: 1,
                    category: "$productDetail.name"
                }
            }
        ])
        if (!singleProduct || singleProduct.length === 0) {
            throw new ApiError(404, "Product not found")

        }
        return res
            .status(200)
            .json(new ApiResponse(200, singleProduct, "Product Fetched Successfully"))
    } catch (error) {
        console.log("Error while fetching a product from server", error);
        return res.status(500).json(new ApiError(500, "Internal Server Error"));

    }



})


const updateProduct = asyncHandler(async (req, res) => {
    let { name, description, category, variants } = req.body;


    if (typeof variants === "string") {
        variants = JSON.parse(variants)
    }
    if (!name && !description && !category && !Array.isArray(variants) || variants.length === 0) {
        throw new ApiError(400, "Atleast one field is required to update")
    }

    const productId = await Products.findById(req.params.id)
    if (!productId) {
        throw new ApiError(404, "Product not found");
    }

    if (name) {
        productId.name = name
        productId.slug = slugify(name)

    }



    if (description) productId.description = description;
    if (category) productId.category = category;
    if (Array.isArray(variants)) productId.variants = variants

    if (req.file) {
        const photoLocalPath = req.file?.path;
        console.log(photoLocalPath);

        if (!photoLocalPath) {
            throw new ApiError(400, "Photo is Required");
        }

        const photoFile = req.file;
        // console.log(photoFile);

        const maxFileSize = 2 * 1024 * 1024; // 2 MB
        if (photoFile.size > maxFileSize) {
            throw new ApiError(400, "Image size must be less than 2 MB");

        }
        if (productId.photo) {
            // Assuming you have a utility to delete from Cloudinary
            await deleteFromCloudinary(productId.photo);
        }
        const photo = await uploadOnCloudinary(photoLocalPath)
        if (!photo) {
            throw new ApiError(500, "Failed to update photo. Please try again.");
        }
        productId.photo = photo.url;
    }
    await productId.save()
    return res
        .status(200)
        .json(new ApiResponse(200, productId, "Product updated Successfully"))

})

// delete controller
const deleteProduct = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Products.findByIdAndDelete(id)
        if (!product) {
            throw new ApiError(404, "Product Not Found")
        }
        return res
            .status(200)
            .json(new ApiResponse(200, product, "Product deleted Successfully"))

    } catch (error) {
        console.log("Error in Deleting Product", error);
        return res.status(500).json(new ApiError(500, "Internal Server Error"));

    }



})

export {
    createProduct,
    getProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct
}