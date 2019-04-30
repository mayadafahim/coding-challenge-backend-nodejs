import { UnitOfWork } from "../Repositories/UnitOfWork";
import { StolenBikeRepository } from "../Repositories/Engines/index";
import { StolenBikeModel } from "./Models/StolenBikeModel";
import { StolenBikeFilter } from "./Models/StolenBikeFilter";

export class StolenBikeManagement {
    repository: StolenBikeRepository;
    constructor() {
        this.repository = UnitOfWork.StolenBikeRepository;
    }

    async create(bike: StolenBikeModel): Promise<StolenBikeModel> {
        return await this.repository.create(bike);
    }

    async find(bike: StolenBikeFilter): Promise<StolenBikeModel[]> {
        return await this.repository.find(bike);
    }

    async assignOfficers(officerIds: number[]): Promise<void> {
        await this.repository.assignOfficers(officerIds);
    }

}