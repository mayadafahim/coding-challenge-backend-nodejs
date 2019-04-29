import * as schema from 'typeorm';
import 'reflect-metadata';
import { PoliceOfficer } from './PoliceOfficer';

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

    @schema.Column()
    resolved: boolean;

    @schema.OneToOne((type) => PoliceOfficer, (officer) => officer.bike)
    @schema.JoinColumn({ name: "policeOfficerId" })
    public policeOfficer: PoliceOfficer;
    
} 