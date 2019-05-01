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

    async findById(id: number): Promise<StolenBikeModel> {
        return await this.repository.findById(id);
    }

    async markAsResolved(bike: StolenBikeModel): Promise<StolenBikeModel> {
        let updatedBike = await this.repository.markAsResolved(bike);
        if (bike.policeOffice) {
            await this.repository.assignOfficers([bike.policeOffice.id]);
        }
        return updatedBike;
    }

}