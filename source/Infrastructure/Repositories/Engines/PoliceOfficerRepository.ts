import { MapPoliceOfficer } from "../../Domain/MapEntities/MapPoliceOfficer";
import { PoliceOfficerModel } from "../../Domain/Models/PoliceOfficerModel";
import { ConnectionManager } from "./ConnectionManager";
import { GenericRepository } from "../BaseRepositories/GenericRepository";
import { PoliceOfficer } from "./MappingEntities/PoliceOfficer";


export class PoliceOfficerRepository {

    mapPoliceOfficer = new MapPoliceOfficer();

    async createMultiple(officers: PoliceOfficerModel[]): Promise<PoliceOfficerModel[]> {
        let connection = await ConnectionManager.Start();
        let entities = [];
        officers.forEach(officer => {
            entities.push(this.mapPoliceOfficer.modelToRepo(officer));
        });
        let entityCreated = await new GenericRepository(PoliceOfficer, "policeOfficer", connection).createOrUpdate(entities);
        let retData = [];
        entityCreated.forEach(element => {
            retData.push(this.mapPoliceOfficer.repoToModel(element));
        });
        return retData;
    }

}
