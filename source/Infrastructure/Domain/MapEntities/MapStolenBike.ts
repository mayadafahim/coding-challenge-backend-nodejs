import { StolenBikeModel } from "../Models/StolenBikeModel";
import { StolenBike } from "../../Repositories/Engines/MappingEntities/StolenBike";
import { PoliceOfficerModel } from "../Models/PoliceOfficerModel";
import { PoliceOfficer } from "../../Repositories/Engines/MappingEntities/PoliceOfficer";

export class MapStolenBike{
    modelToRepo(stolenBike: StolenBikeModel): StolenBike {
        let stolenBikeEntity = new StolenBike();
        stolenBikeEntity.id = stolenBike.id;
        stolenBikeEntity.licenseNumber = stolenBike.licenseNumber;
        stolenBikeEntity.type = stolenBike.type;
        stolenBikeEntity.owner = stolenBike.owner;
        stolenBikeEntity.color = stolenBike.color;
        stolenBikeEntity.description = stolenBike.description;
        stolenBikeEntity.date  = stolenBike.date;
        stolenBikeEntity.policeOfficer = new PoliceOfficer();
        stolenBikeEntity.policeOfficer.id = stolenBike.policeOffice ? stolenBike.policeOffice.id : null;
        return stolenBikeEntity;
    }

    repoToModel(stolenBike: StolenBike): StolenBikeModel {
        return new StolenBikeModel({
            id: stolenBike.id,
            type: stolenBike.type,
            color: stolenBike.color,
            owner: stolenBike.owner,
            licenseNumber: stolenBike.licenseNumber,
            description: stolenBike.description,
            date: stolenBike.date,
            resolved: stolenBike.resolved,
            policeOffice: stolenBike.policeOfficer? new PoliceOfficerModel({
                id: stolenBike.policeOfficer.id,
                name: stolenBike.policeOfficer.name
            }) : null
        });
    }
}