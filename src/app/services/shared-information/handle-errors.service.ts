import { Injectable }    from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class HandleErrorsService {
    public handleError (error: Response | any, change_message?: boolean) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || 'Failed';
            const err = body.message || JSON.stringify(body);
            errMsg = `${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        if(change_message && error.status === 404){
            errMsg = "User has no single bucketlist";
        }
        return Observable.throw(errMsg);
    }
}
