import { UnitOfWork } from "../Repositories/UnitOfWork";
import { StolenBikeRepository } from "../Repositories/Engines/index";
import { StolenBikeModel } from "./Models/StolenBikeModel";

export class StolenBikeManagement {
    repository: StolenBikeRepository;
    constructor() {
        this.repository = UnitOfWork.StolenBikeRepository;
    }

    async create(bike: StolenBikeModel): Promise<StolenBikeModel> {
        return await this.repository.create(bike);
    }

}