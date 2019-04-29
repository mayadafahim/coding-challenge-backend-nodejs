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
    QueryParam,
    BadRequestError
} from 'routing-controllers';
import { StolenBikeManagement } from '../Infrastructure/Domain/StolenBikeManagement';
import { StolenBikeModel } from '../Infrastructure/Domain/Models/StolenBikeModel';

@JsonController("stolenBikes")
export class StolenBikeController {

    stolenBikeManagement: StolenBikeManagement;

    constructor() {
        this.stolenBikeManagement = new StolenBikeManagement();
    }

    validateInput(bike: any) : boolean {
        return bike.owner && bike.color && bike.type && bike.licenseNumber;
    }
    constructBusinessModel(bike: any) : StolenBikeModel {
        let stolenBike = new StolenBikeModel();
        stolenBike.owner = bike.owner;
        stolenBike.color = bike.color;
        stolenBike.date = bike.date ? new Date(bike.date) : null;
        stolenBike.type = bike.type;
        stolenBike.licenseNumber = bike.licenseNumber;
        stolenBike.description = bike.description;
        return stolenBike;
    } 

    @Post("/")
    async create( @Body() bike: any): Promise<any> {
        if(this.validateInput(bike)) {
            let bikeModel = this.constructBusinessModel(bike);
            let createdBike = await this.stolenBikeManagement.create(bikeModel);
            return createdBike;
        } else {
            return {
                status: 400,
                message: 'Missing Required Params'
            }
        }
    }

    @Put("/:id")
    async resolved( @Param("id") id: number): Promise<any> {
        
    }



}
