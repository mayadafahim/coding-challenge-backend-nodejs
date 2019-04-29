import { UnitOfWork } from "../Repositories/UnitOfWork";
import { StolenBikeRepository } from "../Repositories/Engines/index";

export class StolenBikeManagement {
    repository: StolenBikeRepository;
    constructor() {
        this.repository = UnitOfWork.StolenBikeRepository;
    }

}