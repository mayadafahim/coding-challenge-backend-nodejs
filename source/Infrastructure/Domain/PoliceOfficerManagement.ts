import { UnitOfWork } from "../Repositories/UnitOfWork";
import { PoliceOfficerRepository } from "../Repositories/Engines/index";
import { PoliceOfficerModel } from "./Models/PoliceOfficerModel";

export class PoliceOfficerManagement {
    repository: PoliceOfficerRepository;
    constructor() {
        this.repository = UnitOfWork.PoliceOfficerRepository;
    }

    async incOfficers(count): Promise<PoliceOfficerModel[]> {

        let officers = [];
        // Prepare police officers models
        for (let i = 0; i < count; i++) {
            officers.push(new PoliceOfficerModel({
                name: 'rand' + i,
                available: true
            }));
        }
        return await this.createMultiple(officers);

    }

    async decOfficers(count): Promise<number> {
        return await this.repository.deleteOfficers(count);
    }

    async createMultiple(officers: PoliceOfficerModel[]): Promise<PoliceOfficerModel[]> {
        return await this.repository.createMultiple(officers);
    }

    async getAavailableOfficer(): Promise<PoliceOfficerModel> {
        return await this.repository.getAvailableOfficer();
    }

}