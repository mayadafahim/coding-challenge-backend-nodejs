import * as schema from 'typeorm';
import 'reflect-metadata';

@schema.Entity("stolen_bikes")
export class StolenBike {

    @schema.PrimaryGeneratedColumn()
    id: number;

    @schema.Column()
    licenseNumber: string;

    @schema.Column()
    color: string;

    @schema.Column()
    type: string;


    @schema.Column()
    owner: string;

    @schema.Column()
    date: Date;

    @schema.Column()
    description: string;
    
} 