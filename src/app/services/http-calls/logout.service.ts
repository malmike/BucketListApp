import { Injectable }    from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { GlobalVariables } from '../../global-variables/global-variables';
import { ResponseModel } from '../../models/response.model';
import { GenerateHeadersService } from '../shared-information/generate-headers.service';
import { HandleErrorsService } from '../shared-information/handle-errors.service';

@Injectable()
export class LogoutService {

    authUrl: string = GlobalVariables.getInstance().getWebApi();
    storeUser: string = GlobalVariables.getInstance().getStoreUser();
    private response: ResponseModel = new ResponseModel();

    constructor(
        private http: Http,
        private generateHeadersService: GenerateHeadersService,
        private handleErrorsService: HandleErrorsService) {}

    logout(path: string): Observable<ResponseModel> {
        let urlPath: string = this.authUrl + path;
        return this.http
            .get(urlPath, this.generateHeadersService.getHeaders(true))
            .map((res: Response) => {
                let resp = res.json();
                localStorage.removeItem(this.storeUser);
                this.response.status = resp.status;
                this.response.message = resp.message;
                return this.response;
            })
            .catch((err) => this.handleErrorsService.handleError(err));
    }
}
