import { PoliceOfficerModel } from "../Models/PoliceOfficerModel";
import { PoliceOfficer } from "../../Repositories/Engines/MappingEntities/PoliceOfficer";

export class MapPoliceOfficer {
    modelToRepo(policeOfficer: PoliceOfficerModel): PoliceOfficer {
        let policeOfficerEntity = new PoliceOfficer();
        policeOfficerEntity.id = policeOfficer.id;
        policeOfficerEntity.available = policeOfficer.available;
        policeOfficerEntity.name = policeOfficer.name;
        return policeOfficerEntity;
    }

    repoToModel(policeOfficer: PoliceOfficer): PoliceOfficerModel {
        return new PoliceOfficerModel({
            id: policeOfficer.id,
            available: policeOfficer.available,
            name: policeOfficer.name
        });
    }
}