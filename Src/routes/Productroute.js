import { Router } from "express"
import { verifyJWT,isAdmin } from "../Middlewares/Authmiddleware.js";
import { upload } from "../Middlewares/multermiddleware.js"
import {
    createProduct,
    deleteProduct,
    getSingleProduct,
    getAllProducts,
    updateProduct,
   
} from "../Controllers/ProductController.js";

const router = Router();

router.route('/create-product').post(verifyJWT, isAdmin,upload.single('photo'), createProduct)
router.route('/get-products').get(getAllProducts)
router.route('/get-single-product/:slug').get(getSingleProduct)
router.route('/delete-product/:id').delete(verifyJWT,isAdmin,deleteProduct)
router.route('/update-product/:id').put(verifyJWT,isAdmin, upload.single("photo"),updateProduct)


export default router