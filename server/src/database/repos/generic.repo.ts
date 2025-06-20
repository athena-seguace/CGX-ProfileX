import { Model, Types, FilterQuery, UpdateQuery, ClientSession } from 'mongoose';
import SystemError from '../../utils/systemError';


class GenericRepository<FullT, CreateT, UpdateT> {
    constructor(protected readonly model: Model<any>) { }

    async count(filter: FilterQuery<FullT>, session?: ClientSession): Promise<number> {
        try {
            return await this.model.countDocuments(filter).session(session || null).exec();
        } catch (error) {
            throw new SystemError('Failed to count documents.', {
                origin: 'src:database:db:repos:generic.repo:GenericRepository:count()',
                filter,
                error
            });
        }
    }

    async insert(data: CreateT, session?: ClientSession): Promise<FullT> {
        try {
            const result = await this.model.create([data], session ? { session } : {});
            return result[0].toObject() as FullT;
        } catch (error) {
            throw new SystemError('Failed to create a document.', {
                origin: 'src:database:db:repos:generic.repo:GenericRepository.insert()',
                data,
                error
            });
        }
    }

    async insertMany(data: CreateT[], session?: ClientSession): Promise<FullT[]> {
        try {
            const docs = await this.model.insertMany(data, { session: session });
            return docs.map(doc => doc.toObject() as FullT);
        } catch (error) {
            throw new SystemError('Failed to insert many documents.', {
                origin: 'src:database:db:repos:generic.repo:GenericRepository:insertMany()',
                data,
                error
            });
        }
    }

    async findById(id: Types.ObjectId, session?: ClientSession): Promise<FullT | null> {
        try {
            return await this.model.findById(id).session(session || null).lean<FullT>().exec();
        } catch (error) {
            throw new SystemError('Failed to find document by Id.', {
                origin: 'src:database:db:repos:generic.repo:GenericRepository.findById()',
                id,
                error
            });
        }
    }

    async findOne(filter: FilterQuery<FullT>, session?: ClientSession): Promise<FullT | null> {
        try {
            return await this.model.findOne(filter).session(session || null).lean<FullT>().exec();
        } catch (error) {
            throw new SystemError('Failed to find one document.', {
                origin: 'src:database:db:repos:generic.repo:GenericRepository.findOne()',
                filter,
                error
            });
        }
    }

    async findAll(filter: FilterQuery<FullT> = {}, session?: ClientSession): Promise<FullT[]> {
        try {
            return await this.model.find(filter).session(session || null).lean<FullT[]>().exec();
        } catch (error) {
            throw new SystemError('Failed to find all documents.', {
                origin: 'src:database:db:repos:generic.repo:GenericRepository.findAll()',
                filter,
                error
            });
        }
    }

    async updateById(
        id: Types.ObjectId,
        update: UpdateQuery<UpdateT>,
        session?: ClientSession,
    ): Promise<FullT | null> {
        try {
            const doc = await this.model.findByIdAndUpdate(id, update, { session }).exec();
            return doc ? doc.toObject() : null;
        } catch (error) {
            throw new SystemError('Failed to update document(s).', {
                origin: 'src:database:db:repos:generic.repo:GenericRepository.updateById()',
                id,
                update,
                error
            });
        }
    }

    async removeById(id: Types.ObjectId, session?: ClientSession): Promise<boolean> {
        try {
            const doc = await this.model.findByIdAndDelete(id, { session }).exec();
            return !!doc;
        } catch (error) {
            throw new SystemError('Failed to remove a document.', {
                origin: 'src:database:db:repos:generic.repo:GenericRepository.removeById()',
                id,
                error
            });
        }
    }
}



export default GenericRepository;
