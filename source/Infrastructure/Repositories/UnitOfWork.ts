import { PoliceOfficerRepository, StolenBikeRepository } from "./Engines/index";
import * as TypeORMRepositories from "../../Infrastructure/Repositories/Engines"


//** This is the only allowed layer to call in order to interact with data storage */
export class UnitOfWork {

    static get PoliceOfficerRepository(): PoliceOfficerRepository  {
        return new TypeORMRepositories.PoliceOfficerRepository();
    }

    static get StolenBikeRepository(): StolenBikeRepository  {
        return new TypeORMRepositories.StolenBikeRepository();
    }

}

