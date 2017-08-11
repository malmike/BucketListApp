import { Injectable }    from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { GlobalVariables } from '../../global-variables/global-variables';
import { BucketlistPageModel } from '../../models/bucketlist_page.model';

@Injectable()
export class GetBucketlistService {

    apiUrl: string = GlobalVariables.getInstance().getWebApi();
    private bucketlist_page: BucketlistPageModel = new BucketlistPageModel();

    constructor(private http: Http) {}

    getBucketlists(path: string, token: string): Observable<Boolean>{
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
                console.log(test)
                this.bucketlist_page = test;
                if(this.bucketlist_page.page < 1){
                    return false;
                }else{
                    return true;
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

    public getBucketlistPage(): BucketlistPageModel{
        return this.bucketlist_page;
    }

}