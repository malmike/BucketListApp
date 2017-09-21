import { Injectable }    from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { GlobalVariables } from '../../global-variables/global-variables';
import { ResponseModel } from '../../models/response.model';
import { GenerateHeadersService } from '../shared-information/generate-headers.service';
import { HandleErrorsService } from '../shared-information/handle-errors.service';

@Injectable()
export class DeleteItemService {

    apiUrl:string = GlobalVariables.getInstance().getWebApi();
    private response: ResponseModel = new ResponseModel();

    constructor(
        private http: Http,
        private generateHeadersService: GenerateHeadersService,
        private handleErrorsService: HandleErrorsService) {}

    deleteItem(path: string, token: string): Observable<ResponseModel>{
        let urlPath: string = this.apiUrl + path;
        return this.http
            .delete(urlPath, this.generateHeadersService.getHeaders(true))
            .map((res: Response) => {
                let resp: ResponseModel = res.json();
                return resp;
            })
            .catch((err) => this.handleErrorsService.handleError(err));
    }

}
