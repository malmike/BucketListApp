import { Injectable }    from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { GlobalVariables } from '../../global-variables/global-variables';
import { BucketlistPageModel } from '../../models/bucketlist_page.model';
import { ResponseModel } from '../../models/response.model'

@Injectable()
export class GetBucketlistsService {

    apiUrl: string = GlobalVariables.getInstance().getWebApi();
    private bucketlist_page: BucketlistPageModel = new BucketlistPageModel();
    private response: ResponseModel = new ResponseModel();

    constructor(private http: Http) {}

    getBucketlists(path: string, token: string): Observable<ResponseModel>{
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
                let test: BucketlistPageModel = res.json();
                this.bucketlist_page = test;
                if(this.bucketlist_page.page < 1){
                    this.response.status = "fail";
                    this.response.message = "Failure retrieving bucketlists";
                    return this.response;
                }else{
                    this.response.status = "success";
                    this.response.message = "Bucketlists retrieved";
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
        if(error.status === 404){
            errMsg = "User has no single bucketlist";
        }
        return Observable.throw(errMsg);
    }

    public getBucketlistPage(): BucketlistPageModel{
        return this.bucketlist_page;
    }

}