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
import { StolenBikeFilter } from '../Infrastructure/Domain/Models/StolenBikeFilter';
import { PoliceOfficerManagement } from '../Infrastructure/Domain/PoliceOfficerManagement';

@JsonController("stolenBikes")
export class StolenBikeController {

    stolenBikeManagement: StolenBikeManagement;
    policeOfficerManagement: PoliceOfficerManagement;

    constructor() {
        this.stolenBikeManagement = new StolenBikeManagement();
        this.policeOfficerManagement = new PoliceOfficerManagement();
    }

    /**
     * validate input for creating bike
     */

    validateInput(bike: any) : boolean {
        return bike.owner && bike.color && bike.type && bike.licenseNumber;
    }

    /**
     * 
     * Construct Business Model for creating new bike
     */
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
            let availableOfficer = await this.policeOfficerManagement.getAavailableOfficer();
            bikeModel.policeOffice = availableOfficer;
            let createdBike = await this.stolenBikeManagement.create(bikeModel);
            return createdBike;
        } else {
            return {
                status: 400,
                message: 'Missing Required Params'
            }
        }
    }

    /**
     *  Filter all bikes with start and limit
     * @param start start from record numner ex:20
     * @param limit how many records will be fetched
     * @param licenseNumber 
     * @param type 
     * @param color 
     * @param owner 
     * @param description 
     * @param date_from start date
     * @param date_to end date
     */
    @Get("/")
    async findAll( @QueryParam("start")
    start: number,
    @QueryParam("limit")
    limit: number,
    @QueryParam("licenseNumber")
    licenseNumber: string,
    @QueryParam("type")
    type: string,
    @QueryParam("color")
    color: string,
    @QueryParam("owner")
    owner: string,
    @QueryParam("description")
    description: string,
    @QueryParam("date_from")
    date_from: string,
    @QueryParam("date_to")
    date_to: string): Promise<any> {
        let filterBike = new StolenBikeFilter();
        filterBike.start = start || 0;
        filterBike.limit = limit || 20;
        filterBike.licenseNumber = licenseNumber || "";
        filterBike.type = type || "";
        filterBike.color = color || "";
        filterBike.owner = owner || "";
        filterBike.description = description || "";
        filterBike.date_to = date_to ? new Date(date_to) : null;
        filterBike.date_from = date_from ? new Date(date_from) : null;
        let bikes = await this.stolenBikeManagement.find(filterBike);
        return bikes;
    }
    /**
     * Mark bike as resolved
     * @param id Bike id
     */
    @Put("/:id")
    async resolved( @Param("id") id: number): Promise<any> {
        let bike = await this.stolenBikeManagement.findById(id);
        if(!bike) {
            return {
                status: 401,
                message: 'Bike not found'
            }
        }
        return await this.stolenBikeManagement.markAsResolved(bike);
    }



}
