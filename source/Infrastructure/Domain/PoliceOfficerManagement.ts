import { UnitOfWork } from "../Repositories/UnitOfWork";
import { PoliceOfficerRepository } from "../Repositories/Engines/index";

export class PoliceOfficerManagement {
    repository: PoliceOfficerRepository;
    constructor() {
        this.repository = UnitOfWork.PoliceOfficerRepository;
    }

}