import { Injectable }    from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { GlobalVariables } from '../../global-variables/global-variables';
import { BucketlistItemModel} from '../../models/bucketlist_item.model';
import { ResponseModel } from '../../models/response.model';
import { GenerateHeadersService } from '../shared-information/generate-headers.service';
import { HandleErrorsService } from '../shared-information/handle-errors.service';

@Injectable()
export class AddBucketlistItemService {

    authUrl:string = GlobalVariables.getInstance().getWebApi();
    private response: ResponseModel = new ResponseModel();

    constructor(
        private http: Http,
        private generateHeadersService: GenerateHeadersService,
        private handleErrorsService: HandleErrorsService) {}

    addBucketlistItem(bucketlistitem: BucketlistItemModel, path: string): Observable<ResponseModel>{
        let urlPath: string = this.authUrl + path;

        return this.http
            .post(urlPath, JSON.stringify(bucketlistitem), this.generateHeadersService.getHeaders(true))
            .map((res: Response) => {
                let resp: ResponseModel = res.json();
                return resp;
            })
            .catch((err) => this.handleErrorsService.handleError(err));
    }
}
