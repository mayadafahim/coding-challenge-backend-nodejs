import { MapStolenBike } from "../../Domain/MapEntities/MapStolenBike";
import { StolenBikeModel } from "../../Domain/Models/StolenBikeModel";
import { ConnectionManager } from "./ConnectionManager";
import { GenericRepository } from "../BaseRepositories/GenericRepository";
import { StolenBike } from "./MappingEntities/StolenBike";


export class StolenBikeRepository {

    mapStolenBike = new MapStolenBike();

    async create(bike: StolenBikeModel): Promise<StolenBikeModel> {

        let connection = await ConnectionManager.Start();
        let entityObject = this.mapStolenBike.modelToRepo(bike);
        let entityCreated = await new GenericRepository(StolenBike, 'StolenBike', connection).createOrUpdate(entityObject);
        return this.mapStolenBike.repoToModel(entityCreated);
    }


}
