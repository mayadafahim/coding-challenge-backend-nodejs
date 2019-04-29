import { Middleware, ExpressErrorMiddlewareInterface } from "routing-controllers";
import { isUndefined } from "util";

@Middleware({ type: "after" })
export class CustomErrorHandler implements ExpressErrorMiddlewareInterface {


    error(error: any, request: any, response: any, next: (err: any) => any) {

        let message = '';
        if (error.errors) {
            try {
                // Field Validation Errors
                var paramString = Object.keys(error.errors[0].constraints)[0];
                var constraints = error.errors[0].constraints;
                message = constraints[paramString];

            } catch (error) {
                message = error.message;
            }
        } else {
            // Custom Errors
            message = error.message;
        }

        var statusCode = 200;

        if (error.httpCode != 400 && error.httpCode != 404 && error.httpCode != 401 && error.httpCode != 601) {
            console.log(error.message);
            message = "Operation Failed";
            console.log(error.message);
        }

        response.status(statusCode);
        response.send({
            code: error.httpCode,
            status: 500,
            message: message
        });


        next(null);
    }
}