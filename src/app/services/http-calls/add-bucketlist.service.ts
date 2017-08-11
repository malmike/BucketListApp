import { Injectable }    from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { GlobalVariables } from '../../global-variables/global-variables';
import { BucketlistModel } from '../../models/bucketlist.model';
import { ResponseModel } from '../../models/response.model';

@Injectable()
export class AddBucketlistService {

    authUrl:string = GlobalVariables.getInstance().getWebApi();
    private bucketlist: BucketlistModel = new BucketlistModel();
    private response: ResponseModel = new ResponseModel();

    constructor(private http: Http) {}

    addBucketlist(bucketlist: BucketlistModel, path: string, token: string): Observable<ResponseModel>{
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('x-access-token', token);
        headers.append('Accept', 'application/json');
        let requestoptions = new RequestOptions({
            headers: headers
        });


        let urlPath: string = this.authUrl + path;

        return this.http
            .post(urlPath, JSON.stringify(bucketlist), requestoptions)
            .map((res: Response) => {
                let resp = res.json();
                if(resp.status === 'success'){
                    this.bucketlist = resp.data;
                    this.response.status = "success";
                    this.response.message = "Bucketlist has been added";
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
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

    getBucketlist(): BucketlistModel{
        return this.bucketlist;
    }
}