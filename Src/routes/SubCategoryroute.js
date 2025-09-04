import { Router } from "express";
import { getsubCategories, insertsubCategory,deleteSubCategories } from "../Controllers/SubCategoryController.js";
import { verifyJWT,isAdmin } from "../Middlewares/Authmiddleware.js";
const router =  Router()
router.route("/create-subcategory").post(verifyJWT,isAdmin,insertsubCategory)
router.route("/get-subcategories").get(getsubCategories)
router.route("/delete-subcategory/:id").delete(verifyJWT,isAdmin,deleteSubCategories)
router.route("edit-category/:id").put(verifyJWT,isAdmin)



export default router