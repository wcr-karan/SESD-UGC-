import { BaseRepository } from "./base.repository";
import Product, { IProduct } from "../models/product.model";
import { FilterQuery } from "mongoose";

export class ProductRepository extends BaseRepository<IProduct> {
    constructor() {
        super(Product);
    }

    // Additional specific methods can be added here
    async findByCategory(category: string): Promise<IProduct[]> {
        return this.find({ category });
    }

    async search(query: string): Promise<IProduct[]> {
        // Uses the text index defined in the model
        return this.find({ $text: { $search: query } } as FilterQuery<IProduct>);
    }
}
