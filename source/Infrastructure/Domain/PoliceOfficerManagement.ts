import { UnitOfWork } from "../Repositories/UnitOfWork";
import { PoliceOfficerRepository } from "../Repositories/Engines/index";
import { PoliceOfficerModel } from "./Models/PoliceOfficerModel";

export class PoliceOfficerManagement {
    repository: PoliceOfficerRepository;
    constructor() {
        this.repository = UnitOfWork.PoliceOfficerRepository;
    }

    async incOrDecOfficers(type, count): Promise<PoliceOfficerModel[]> {
        // If required to add more officers
        if (type == 'inc') {
            let officers = [];
            // Prepare police officers models
            for (let i = 0; i < count; i++) {
                officers.push(new PoliceOfficerModel({
                    name: 'rand' + i,
                    available: true
                }));
            }
            return await this.createMultiple(officers);
        } else {

        }
    }

    async createMultiple(officers: PoliceOfficerModel[]): Promise<PoliceOfficerModel[]> {
        return await this.repository.createMultiple(officers);
    }

}