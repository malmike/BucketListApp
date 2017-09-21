import { Injectable }    from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { GlobalVariables } from '../../global-variables/global-variables';
import { ResponseModel } from '../../models/response.model';
import { GenerateHeadersService } from '../shared-information/generate-headers.service';
import { HandleErrorsService } from '../shared-information/handle-errors.service';

@Injectable()
export class DeleteBucketlistService {

    apiUrl:string = GlobalVariables.getInstance().getWebApi();
    private response: ResponseModel = new ResponseModel();

    constructor(
        private http: Http,
        private generateHeadersService: GenerateHeadersService,
        private handleErrorsService: HandleErrorsService) {}

    deleteBucketlist(path: string, token: string): Observable<ResponseModel>{
        let options: RequestOptions = new RequestOptions(this.generateHeadersService.getHeaders(token));
        let urlPath: string = this.apiUrl + path;
        return this.http
            .delete(urlPath, options)
            .map((res: Response) => {
                let resp: ResponseModel = res.json();
                return resp;
            })
            .catch((err) => this.handleErrorsService.handleError(err));
    }
}
