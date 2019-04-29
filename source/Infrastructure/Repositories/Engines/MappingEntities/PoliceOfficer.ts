import * as schema from 'typeorm';
import 'reflect-metadata';

@schema.Entity("police_officers")
export class PoliceOfficer {

    @schema.PrimaryGeneratedColumn()
    id: number;

    @schema.Column()
    name: string;

    @schema.Column()
    available: boolean;
    
} 