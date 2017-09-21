import { Injectable }    from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { GlobalVariables } from '../../global-variables/global-variables';
import { BucketlistModel } from '../../models/bucketlist.model';
import { ResponseModel } from '../../models/response.model';
import { GenerateHeadersService } from '../shared-information/generate-headers.service';
import { HandleErrorsService } from '../shared-information/handle-errors.service';

@Injectable()
export class GetBucketlistService {

    apiUrl: string = GlobalVariables.getInstance().getWebApi();
    private bucketlist: BucketlistModel = new BucketlistModel();
    private response: ResponseModel = new ResponseModel();

    constructor(
        private http: Http,
        private generateHeadersService: GenerateHeadersService,
        private handleErrorsService: HandleErrorsService) {}

    getBucketlist(path: string, token: string): Observable<ResponseModel>{
        let options: RequestOptions = new RequestOptions(this.generateHeadersService.getHeaders(token));
        let urlPath: string = this.apiUrl + path;
        return this.http
            .get(urlPath, options)
            .map((res: Response) => {
                let test: BucketlistModel = res.json();
                this.bucketlist = test;
                this.response.status = "success";
                this.response.message = "Bucketlist retrieved";
                return this.response;
            })
            .catch((err) => this.handleErrorsService.handleError(err));
    }

    public getSingleBucketlist(): BucketlistModel{
        return this.bucketlist;
    }

}