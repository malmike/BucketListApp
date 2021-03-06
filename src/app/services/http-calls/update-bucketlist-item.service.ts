import { Injectable }    from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { GlobalVariables } from '../../global-variables/global-variables';
import { BucketlistItemModel } from '../../models/bucketlist_item.model';
import { ResponseModel } from '../../models/response.model';
import { GenerateHeadersService } from '../shared-information/generate-headers.service';
import { HandleErrorsService } from '../shared-information/handle-errors.service';

@Injectable()
export class UpdateBucketlistItemService {

    authUrl:string = GlobalVariables.getInstance().getWebApi();
    private item: BucketlistItemModel = new BucketlistItemModel();
    private response: ResponseModel = new ResponseModel();

    constructor(
        private http: Http,
        private generateHeadersService: GenerateHeadersService,
        private handleErrorsService: HandleErrorsService) {}

    updateBucketlistItem(item: BucketlistItemModel, path: string, token: string): Observable<ResponseModel>{
        let options: RequestOptions = new RequestOptions(this.generateHeadersService.getHeaders(token));
        let urlPath: string = this.authUrl + path;
        return this.http
            .put(urlPath, JSON.stringify(item), options)
            .map((res: Response) => {
                let resp = res.json();
                this.item = resp;
                this.response.status = "success";
                this.response.message = "Bucketlist Item updated";
                return this.response;
            })
            .catch((err) => this.handleErrorsService.handleError(err));
    }

    public getItem():BucketlistItemModel{
        return this.item;
    }

}