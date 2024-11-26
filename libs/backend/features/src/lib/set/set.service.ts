import { HttpException, Injectable } from "@nestjs/common";
import { Model } from 'mongoose';
import { InjectModel } from "@nestjs/mongoose";
import { Set as SetModel, SetDocument } from './set.schema';
import { ISet } from "@comp-gym/shared/api";
import { CreateSetDto, UpdateSetDto } from "@comp-gym/backend/dto";

@Injectable()
export class SetService {
    constructor(
        @InjectModel(SetModel.name) private setModel: Model<SetDocument>
    ) {}

    async create(set: CreateSetDto): Promise<ISet | null> {
        if (set) {
            return this.setModel.create(set);
        }
        return null;
    }

    async update(_id: string, set: UpdateSetDto): Promise<ISet | null> {
        return this.setModel.findByIdAndUpdate({ _id }, set);
    }

    async delete(_id: string): Promise<null> {
        this.setModel.findByIdAndDelete({ _id });
        return null;
    }
}