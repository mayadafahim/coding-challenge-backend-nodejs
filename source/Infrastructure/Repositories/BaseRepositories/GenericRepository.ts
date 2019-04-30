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


    public async delete(field: string, value: string): Promise<boolean> {
        let repo = this.connectionManager.getRepository(this.type).createQueryBuilder(this.alias);
        return await repo.delete().where(`${field} = ('${value}')`).execute();
    }

    public async deleteMultiple(field: string, value: number[]): Promise<boolean> {
        let repo = this.connectionManager.getRepository(this.type).createQueryBuilder(this.alias);
        return await repo.delete().where(`${field} IN (${value})`).execute();
    }
}