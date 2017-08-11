import { Injectable }    from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { GlobalVariables } from '../../global-variables/global-variables';
import { ResponseModel } from '../../models/response.model';

@Injectable()
export class DeleteBucketlistService {

    apiUrl:string = GlobalVariables.getInstance().getWebApi();
    private response: ResponseModel = new ResponseModel();

    constructor(private http: Http) {}

    deleteBucketlist(path: string, token: string): Observable<ResponseModel>{
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('x-access-token', token);
        headers.append('Accept', 'application/json');
        let requestoptions = new RequestOptions({
            headers: headers
        });


        let urlPath: string = this.apiUrl + path;

        return this.http
            .delete(urlPath, requestoptions)
            .map((res: Response) => {
                let resp: ResponseModel = res.json();
                if(resp.status === 'success'){
                    return resp;
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
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

}
