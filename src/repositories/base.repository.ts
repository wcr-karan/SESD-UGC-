import { Model, Document, FilterQuery, UpdateQuery } from 'mongoose';

export interface IRead<T> {
    find(filter: FilterQuery<T>, options?: any): Promise<T[]>;
    findById(id: string): Promise<T | null>;
    findOne(filter: FilterQuery<T>): Promise<T | null>;
}

export interface IWrite<T> {
    create(item: Partial<T>): Promise<T>;
    update(id: string, item: UpdateQuery<T>): Promise<T | null>;
    delete(id: string): Promise<boolean>;
}

export abstract class BaseRepository<T extends Document> implements IRead<T>, IWrite<T> {
    private _model: Model<T>;

    constructor(model: Model<T>) {
        this._model = model;
    }

    async create(item: Partial<T>): Promise<T> {
        return await this._model.create(item);
    }

    async find(filter: FilterQuery<T> = {}, options: any = {}): Promise<T[]> {
        const { page = 1, limit = 10, sort, ...rest } = options;

        let query = this._model.find(filter);

        if (sort) {
            query = query.sort(sort);
        }

        if (page && limit) {
            const skip = (page - 1) * limit;
            query = query.skip(skip).limit(Number(limit));
        }

        return await query.exec();
    }

    async findOne(filter: FilterQuery<T>): Promise<T | null> {
        return await this._model.findOne(filter).exec();
    }

    async findById(id: string): Promise<T | null> {
        return await this._model.findById(id).exec();
    }

    async update(id: string, item: UpdateQuery<T>): Promise<T | null> {
        return await this._model.findByIdAndUpdate(id, item, { new: true }).exec();
    }

    async delete(id: string): Promise<boolean> {
        const result = await this._model.findByIdAndDelete(id).exec();
        return !!result;
    }

    async count(filter: FilterQuery<T> = {}): Promise<number> {
        return await this._model.countDocuments(filter).exec();
    }
}
