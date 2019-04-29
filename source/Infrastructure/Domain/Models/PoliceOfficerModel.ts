export class PoliceOfficerModel {
    public constructor(init?: Partial<PoliceOfficerModel>) {
        Object.assign(this, init);
    }
    id: number;
    name: string;
    available: boolean;
}