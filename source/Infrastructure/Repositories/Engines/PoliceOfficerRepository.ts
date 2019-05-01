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

    async deleteOfficers(count: number): Promise<number> {
        let connection = await ConnectionManager.Start();
        return await new GenericRepository(PoliceOfficer, "police_officers", connection).deleteWithLimit('available', 1, count);
    }

    async getAvailableOfficer(): Promise<PoliceOfficerModel> {
        let connection = await ConnectionManager.Start();
        let query = (await new GenericRepository(PoliceOfficer, "PoliceOfficer", connection).list())
            .andWhere("(available = 1)")
            .take(1);

        let result = await query.getOne();
        if(!result) {
            return null;
        }
        return this.mapPoliceOfficer.repoToModel(result);
    }

}
