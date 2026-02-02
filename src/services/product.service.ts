import { ProductRepository } from "../repositories/product.repository";
import { IProduct } from "../models/product.model";
import { FilterQuery, UpdateQuery } from "mongoose";

export class ProductService {
    private productRepository: ProductRepository;

    constructor() {
        this.productRepository = new ProductRepository();
    }

    async createProduct(data: Partial<IProduct>): Promise<IProduct> {

        const existingProduct = await this.productRepository.findOne({ sku: data.sku } as FilterQuery<IProduct>);
        if (existingProduct) {
            throw new Error(`Product with SKU ${data.sku} already exists`);
        }

        return await this.productRepository.create(data);
    }

    async getAllProducts(options: any): Promise<{ data: IProduct[], total: number, page: number, limit: number }> {
        const { search, category, minPrice, maxPrice, page = 1, limit = 10, sort } = options;

        const filter: FilterQuery<IProduct> = {};

        if (search) {
            filter.$text = { $search: search };
        }

        if (category) {
            filter.category = category;
        }

        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = Number(minPrice);
            if (maxPrice) filter.price.$lte = Number(maxPrice);
        }


        if (options.isAvailable !== undefined) {
            filter.isAvailable = options.isAvailable === 'true';
        }

        const data = await this.productRepository.find(filter, { page, limit, sort });
        const total = await this.productRepository.count(filter as any);

        return {
            data,
            total,
            page: Number(page),
            limit: Number(limit)
        };
    }

    async getProductById(id: string): Promise<IProduct | null> {
        return await this.productRepository.findById(id);
    }

    async updateProduct(id: string, data: UpdateQuery<IProduct>): Promise<IProduct | null> {
        return await this.productRepository.update(id, data);
    }

    async deleteProduct(id: string): Promise<boolean> {
        return await this.productRepository.delete(id);
    }
}
