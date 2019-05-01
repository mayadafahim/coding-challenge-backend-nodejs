import {
    Authorized,
    Body,
    CurrentUser,
    Delete,
    Get,
    HttpError,
    JsonController,
    Param,
    Post,
    Put,
    QueryParam
} from 'routing-controllers';
import { PoliceOfficerManagement } from '../Infrastructure/Domain/PoliceOfficerManagement';
import { StolenBikeManagement } from '../Infrastructure/Domain/StolenBikeManagement';

@JsonController("policeOfficers")
export class PoliceOfficerController {

    policeOfficerManagement: PoliceOfficerManagement;
    stolenBikeManagement: StolenBikeManagement;

    constructor() {
        this.policeOfficerManagement = new PoliceOfficerManagement();
        this.stolenBikeManagement = new StolenBikeManagement();
    }

    @Post("/")
    async create( @Body() officers: any[]): Promise<any> {

    }


    @Delete("/:ids")
    async delete( @Param("ids") ids: string): Promise<any> {

    }


    @Post("/adjustCount")
    async incOrDecOfficers( @Body() data: any): Promise<any> {
        if (!data.type || !data.count) {
            return {
                status: 400,
                message: 'Missing Required Params'
            }
        } else {
            if (data.type == 'inc') {
                let officers = await this.policeOfficerManagement.incOfficers(data.count);
                await this.stolenBikeManagement.assignOfficers(officers.map(officer => officer.id));
                return {
                    message: officers.length + " officers have been created"
                }
            } else {
                let officersCount = await this.policeOfficerManagement.decOfficers(data.count);
                return {
                    message: officersCount + " available officers have been deleted"
                }
            }
        }
    }

}
