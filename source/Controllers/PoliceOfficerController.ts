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

 
    @Delete("/:ids")
    async delete( @Param("ids") ids: string): Promise<any> {
    
    }


    @Post("/adjustCount")
    async incOrDecOfficers( @Body() data: any): Promise<any> {
        
    }

}
