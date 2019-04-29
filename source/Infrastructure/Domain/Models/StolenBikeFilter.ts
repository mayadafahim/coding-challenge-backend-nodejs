
export class StolenBikeFilter {
    public constructor(init?: Partial<StolenBikeFilter>) {
        Object.assign(this, init);
    }
    licenseNumber: string;
    color: string;
    type: string;
    date_from: Date;
    date_to: Date;
    owner: string;
    description: string;
    start: number = 0;
    limit: number = 20;
}