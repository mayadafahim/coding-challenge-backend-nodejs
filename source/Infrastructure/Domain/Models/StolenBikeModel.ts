import { PoliceOfficerModel } from "./PoliceOfficerModel";

export class StolenBikeModel {
    public constructor(init?: Partial<StolenBikeModel>) {
        Object.assign(this, init);
    }
    id: number;
    licenseNumber: string;
    color: string;
    type: string;
    date: Date;
    owner: string;
    description: string;
    resolved: boolean;
    policeOffice: PoliceOfficerModel;
}