import { Injectable }    from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { GlobalVariables } from '../../global-variables/global-variables';
import { BucketlistModel } from '../../models/bucketlist.model';
import { ResponseModel } from '../../models/response.model'

@Injectable()
export class GetBucketlistService {

    apiUrl: string = GlobalVariables.getInstance().getWebApi();
    private bucketlist: BucketlistModel = new BucketlistModel();
    private response: ResponseModel = new ResponseModel();

    constructor(private http: Http) {}

    getBucketlist(path: string, token: string, id:number): Observable<ResponseModel>{
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('x-access-token', token);
        headers.append('Accept', 'application/json');
        let requestoptions = new RequestOptions({
            headers: headers
        });


        let urlPath: string = this.apiUrl + path;
        return this.http
            .get(urlPath, requestoptions)
            .map((res: Response) => {
                let test: BucketlistModel = res.json();
                this.bucketlist = test;
                if(Number(this.bucketlist.id) === id){
                    this.response.status = "success";
                    this.response.message = "Bucketlist retrieved";
                    return this.response;
                }else{
                    this.response.status = "fail";
                    this.response.message = "Failure retrieving bucketlist";
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

    public getSingleBucketlist(): BucketlistModel{
        return this.bucketlist;
    }

}