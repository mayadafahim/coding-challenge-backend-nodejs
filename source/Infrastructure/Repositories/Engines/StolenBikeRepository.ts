import { MapStolenBike } from "../../Domain/MapEntities/MapStolenBike";
import { StolenBikeModel } from "../../Domain/Models/StolenBikeModel";
import { ConnectionManager } from "./ConnectionManager";
import { GenericRepository } from "../BaseRepositories/GenericRepository";
import { StolenBike } from "./MappingEntities/StolenBike";
import { StolenBikeFilter } from "../../Domain/Models/StolenBikeFilter";
import { PoliceOfficer } from "./MappingEntities/PoliceOfficer";


export class StolenBikeRepository {

    mapStolenBike = new MapStolenBike();

    /**
     * 
     * Create a new stolen bike record
     */
    async create(bike: StolenBikeModel): Promise<StolenBikeModel> {
        let connection = await ConnectionManager.Start();
        let entityObject = this.mapStolenBike.modelToRepo(bike);
        let entityCreated = await new GenericRepository(StolenBike, 'StolenBike', connection).createOrUpdate(entityObject);
        return this.mapStolenBike.repoToModel(entityCreated);
    }

    /**
     * 
     * Search for bike by any of its characteristics
     */
    async find(bikeFilter: StolenBikeFilter): Promise<StolenBikeModel[]> {
        let data = [];
        let connection = await ConnectionManager.Start();
        //generate basic query
        let query = (await new GenericRepository(StolenBike, "StolenBike", connection).list())
            .leftJoinAndSelect('StolenBike.policeOfficer', 'policeOfficer')
            .andWhere("(StolenBike.licenseNumber LIKE :licenseNumber)")
            .andWhere("(StolenBike.type LIKE :type)")
            .andWhere("(StolenBike.color LIKE :color)")
            .andWhere("(StolenBike.owner LIKE :owner)")
            .andWhere("(StolenBike.description LIKE :description)")
            .setParameters(
            {
                licenseNumber: `%${bikeFilter.licenseNumber}%`,
                type: `%${bikeFilter.type}%`,
                color: `%${bikeFilter.color}%`,
                owner: `%${bikeFilter.owner}%`,
                description: `%${bikeFilter.description}%`,
            });

        if (bikeFilter.date_from && bikeFilter.date_to) {
            var fromDate = new Date(bikeFilter.date_from);
            var toDate = new Date(bikeFilter.date_to);
            toDate = new Date(toDate.setDate(toDate.getDate() + 1));
            query.andWhere("(StolenBike.date BETWEEN :dateFrom and :dateTo)")
                .setParameters(
                {
                    dateFrom: fromDate,
                    dateTo: toDate
                });
        }

        //set pagination
        query = await query.skip(bikeFilter.start)
            .take(bikeFilter.limit);

        //get data
        let result = await query.getMany();
        result.forEach(bike => {
            let temp = this.mapStolenBike.repoToModel(bike);
            data.push(temp);
        });

        return data;
    }

    /**
     * 
     * Assign officers to the not resolved and unassigned cases
     */
    async assignOfficers(officersIds: number[]): Promise<void> {
        let connection = await ConnectionManager.Start();
        //generate basic query
        let query = (await new GenericRepository(StolenBike, "StolenBike", connection).list())
            .andWhere("(resolved = 0)")
            .andWhere("(policeOfficerId IS NULL)")
            .take(officersIds.length);

        let data = await query.getMany();
        let officersToBeUpdated = [];
        data.forEach((record, index) => {
            record.policeOfficer = new PoliceOfficer();
            record.policeOfficer.id = officersIds[index];
            record.policeOfficer.available = false;
            officersToBeUpdated.push(record.policeOfficer);
        });
        await connection.manager.transaction(async (entityManager) => {
            let entityCreated = await new GenericRepository(StolenBike, 'StolenBike', connection, entityManager).createOrUpdate(data);
            await new GenericRepository(PoliceOfficer, 'PoliceOfficer', connection, entityManager).createOrUpdate(officersToBeUpdated);
        });
    }


}
