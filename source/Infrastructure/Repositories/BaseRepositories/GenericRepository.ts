import * as orm from "typeorm";
import { EntityManager } from "typeorm";

export type ObjectType<T> = { new(): T } | Function;

export class GenericRepository<T> {
    private connection: orm.Connection;
    private type: ObjectType<T>;
    private alias: string;
    private connectionManager: EntityManager | orm.Connection;

    constructor(type: ObjectType<T>, alias: string, connection: orm.Connection, manager?: EntityManager) {
        this.type = type;
        this.connection = connection;
        this.alias = alias;
        this.connectionManager = manager;
        if (!manager) {
            this.connectionManager = connection
        }

    }

    public async list(): Promise<orm.SelectQueryBuilder<T>> {
        return this.connection.getRepository(this.type).createQueryBuilder(this.alias);
    }

    public async createOrUpdate(model: any | any[]): Promise<any | any[]> {
        return await this.connectionManager.getRepository(this.type).save(model);
    }


    public async deleteWithLimit(field: string, value: any, count: number): Promise<any> {
        let query =  await this.connectionManager.query('DELETE from ' + this.alias + ' WHERE ' + field + '=' + value + ' LIMIT ' + count);
        return query.affectedRows;
    }

}