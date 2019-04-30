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

    policeOfficerManagement : PoliceOfficerManagement;
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
            let officers = await this.policeOfficerManagement.incOrDecOfficers(data.type, data.count);
            await this.stolenBikeManagement.assignOfficers(officers.map(officer => officer.id));
            return officers;
        }
    }

}
