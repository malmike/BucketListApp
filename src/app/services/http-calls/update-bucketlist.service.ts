import { Injectable }    from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { GlobalVariables } from '../../global-variables/global-variables';
import { BucketlistModel } from '../../models/bucketlist.model';
import { ResponseModel } from '../../models/response.model';
import { GenerateHeadersService } from '../shared-information/generate-headers.service';
import { HandleErrorsService } from '../shared-information/handle-errors.service';

@Injectable()
export class UpdateBucketlistService {

    authUrl:string = GlobalVariables.getInstance().getWebApi();
    private bucketlist: BucketlistModel = new BucketlistModel();
    private response: ResponseModel = new ResponseModel();

    constructor(
        private http: Http,
        private generateHeadersService: GenerateHeadersService,
        private handleErrorsService: HandleErrorsService) {}

    updateBucketlist(bucketlist: BucketlistModel, path: string, token: string): Observable<ResponseModel>{
        let urlPath: string = this.authUrl + path;

        return this.http
            .put(urlPath, JSON.stringify(bucketlist), this.generateHeadersService.getHeaders(true))
            .map((res: Response) => {
                let resp = res.json();
                this.bucketlist = resp
                this.response.status = "success";
                this.response.message = "Bucketlist updated";
                return this.response;
            })
            .catch((err) => this.handleErrorsService.handleError(err));
    }
    public getBucketlist():BucketlistModel{
        return this.bucketlist;
    }

}