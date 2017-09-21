import { Injectable }    from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { GlobalVariables } from '../../global-variables/global-variables';
import { BucketlistPageModel } from '../../models/bucketlist_page.model';
import { ResponseModel } from '../../models/response.model';
import { GenerateHeadersService } from '../shared-information/generate-headers.service';
import { HandleErrorsService } from '../shared-information/handle-errors.service';

@Injectable()
export class GetBucketlistsService {

    apiUrl: string = GlobalVariables.getInstance().getWebApi();
    private bucketlist_page: BucketlistPageModel = new BucketlistPageModel();
    private response: ResponseModel = new ResponseModel();

    constructor(
        private http: Http,
        private generateHeadersService: GenerateHeadersService,
        private handleErrorsService: HandleErrorsService) {}

    getBucketlists(path: string): Observable<ResponseModel>{
        let urlPath: string = this.apiUrl + path;
        return this.http
            .get(urlPath, this.generateHeadersService.getHeaders(true))
            .map((res: Response) => {
                let test: BucketlistPageModel = res.json();
                this.bucketlist_page = test;
                this.response.status = "success";
                this.response.message = "Bucketlists retrieved";
                return this.response;
            })
            .catch((err) => this.handleErrorsService.handleError(err, true));
    }

    public getBucketlistPage(): BucketlistPageModel{
        return this.bucketlist_page;
    }

}