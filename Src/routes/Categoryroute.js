import { Router } from "express";
import { insertCategory,
         updateCategory,
         getCategory,
         getSingleCategory,
         deleteCategory} from "../Controllers/CategoryController.js";
import { isAdmin, verifyJWT } from "../Middlewares/Authmiddleware.js";

const router = Router();
// routes
router.route('/insert-category').post(verifyJWT,isAdmin ,insertCategory)
router.route('/update-category/:id').put(verifyJWT,isAdmin,updateCategory)
router.route('/get-category').get(getCategory)
router.route('/get-single-category/:slug').get(getSingleCategory)
router.route('/delete-category/:id').delete(verifyJWT,isAdmin,deleteCategory)



export default router