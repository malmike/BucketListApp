import { Injectable }    from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { GlobalVariables } from '../../global-variables/global-variables';
import { UserModel } from '../../models/user.model';
import { ResponseModel } from '../../models/response.model';
import { HandleErrorsService } from '../shared-information/handle-errors.service';
import { GenerateHeadersService } from '../shared-information/generate-headers.service';

@Injectable()
export class RegistrationService {

    authUrl:string = GlobalVariables.getInstance().getWebApi();
    storeUser:string = GlobalVariables.getInstance().getStoreUser();
    private user: UserModel = new UserModel();
    private response: ResponseModel = new ResponseModel();
    private token: string;
    private password: string;

    constructor(
        private http: Http,
        private generateHeadersService: GenerateHeadersService,
        private handleErrorsService: HandleErrorsService) {}

    register(user: UserModel, path: string): Observable<ResponseModel>{
        this.password = user.password;
        let urlPath: string = this.authUrl + path;

        return this.http
            .post(urlPath, JSON.stringify(user), this.generateHeadersService.getHeaders())
            .map((res: Response) => {
                let resp = res.json();
                this.user = resp.data;
                this.user.password = this.password;
                this.token = resp.auth_token;
                localStorage.setItem(this.storeUser, JSON.stringify({ user: this.user, token: this.token }));
                this.response.status = resp.status;
                this.response.message = resp.message;
                return this.response;
            })
            .catch((err) => this.handleErrorsService.handleError(err));
    }
}
