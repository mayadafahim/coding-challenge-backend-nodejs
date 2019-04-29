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

@JsonController("policeOffices")
export class PoliceOfficerController {

  
    @Post("/")
    async create( @Body() officers: any[]): Promise<any> {
        
    }

    @Put("/:id")
    async resolved( @Param("id") id: number): Promise<any> {
        
    }



}
