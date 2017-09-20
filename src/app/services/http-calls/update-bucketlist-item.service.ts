import { Injectable }    from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { GlobalVariables } from '../../global-variables/global-variables';
import { BucketlistItemModel } from '../../models/bucketlist_item.model';
import { ResponseModel } from '../../models/response.model';

@Injectable()
export class UpdateBucketlistItemService {

    authUrl:string = GlobalVariables.getInstance().getWebApi();
    private item: BucketlistItemModel = new BucketlistItemModel();
    private response: ResponseModel = new ResponseModel();

    constructor(private http: Http) {}

    updateBucketlistItem(item: BucketlistItemModel, path: string, token: string): Observable<ResponseModel>{
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('x-access-token', token);
        headers.append('Accept', 'application/json');
        let requestoptions = new RequestOptions({
            headers: headers
        });


        let urlPath: string = this.authUrl + path;

        return this.http
            .put(urlPath, JSON.stringify(item), requestoptions)
            .map((res: Response) => {
                let resp = res.json();
                if(resp){
                    this.item = resp
                    this.response.status = "success";
                    this.response.message = "Bucketlist Item updated";
                    return this.response;
                }else{
                    this.response.status = 'fail';
                    this.response.message = 'Failure updating bucketlist item';
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

    public getItem():BucketlistItemModel{
        return this.item;
    }

}