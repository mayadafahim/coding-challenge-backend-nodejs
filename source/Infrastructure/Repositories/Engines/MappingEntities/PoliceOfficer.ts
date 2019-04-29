import * as schema from 'typeorm';
import 'reflect-metadata';
import { StolenBike } from './StolenBike';

@schema.Entity("police_officers")
export class PoliceOfficer {

    @schema.PrimaryGeneratedColumn()
    id: number;

    @schema.Column()
    name: string;

    @schema.Column()
    available: boolean;

    @schema.OneToOne((type) => StolenBike, (bike) => bike.policeOfficer)
    public bike: StolenBike;
    
} 