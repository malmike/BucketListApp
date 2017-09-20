import { Injectable }    from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { GlobalVariables } from '../../global-variables/global-variables';
import { ResponseModel } from '../../models/response.model'

@Injectable()
export class LogoutService {

    authUrl: string = GlobalVariables.getInstance().getWebApi();
    storeUser: string = GlobalVariables.getInstance().getStoreUser();
    private response: ResponseModel = new ResponseModel();

    constructor(private http: Http) {}

    logout(path: string, token: string): Observable<ResponseModel> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        let requestoptions = new RequestOptions({
            headers: headers
        });


        let urlPath: string = this.authUrl + path;

        return this.http
            .get(urlPath, requestoptions)
            .map((res: Response) => {
                let resp = res.json();
                if(resp.status === 'success'){
                    localStorage.removeItem(this.storeUser);
                    this.response.status = resp.status;
                    this.response.message = resp.message;
                    return this.response;
                }else{
                    this.response.status = "fail";
                    this.response.message = resp.message;
                    return this.response;
                }
            })
            .catch((err) => this.handleError(err));
    }

    public handleError (error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || 'Failed';
            const err = body.message || JSON.stringify(body);
            errMsg = `${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        return Observable.throw(errMsg);
    }

}
