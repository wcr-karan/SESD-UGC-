import { Router } from "express";
import { ProductController } from "../controllers/product.controller";
import { authenticateJWT } from "../middlewares/auth.middleware";

const router = Router();
const productController = new ProductController();

// Public Routes
router.get("/", productController.getProducts);
router.get("/:id", productController.getProductById);

// Protected Routes
router.post("/", authenticateJWT, productController.createProduct);
router.put("/:id", authenticateJWT, productController.updateProduct);
router.delete("/:id", authenticateJWT, productController.deleteProduct);

export default router;
