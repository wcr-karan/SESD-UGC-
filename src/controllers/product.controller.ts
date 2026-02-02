import { Request, Response, NextFunction } from "express";
import { ProductService } from "../services/product.service";

export class ProductController {
    private productService: ProductService;

    constructor() {
        this.productService = new ProductService();
    }

    // Using arrow functions to preserve 'this' context
    public createProduct = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const product = await this.productService.createProduct(req.body);
            res.status(201).json(product);
        } catch (error) {
            next(error);
        }
    }

    public getProducts = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await this.productService.getAllProducts(req.query);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    public getProductById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const product = await this.productService.getProductById(req.params.id);
            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }
            res.status(200).json(product);
        } catch (error) {
            next(error);
        }
    }

    public updateProduct = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const product = await this.productService.updateProduct(req.params.id, req.body);
            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }
            res.status(200).json(product);
        } catch (error) {
            next(error);
        }
    }

    public deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const success = await this.productService.deleteProduct(req.params.id);
            if (!success) {
                return res.status(404).json({ message: "Product not found" });
            }
            res.status(200).json({ message: "Product deleted successfully" });
        } catch (error) {
            next(error);
        }
    }
}
