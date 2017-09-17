import { Injectable }    from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { GlobalVariables } from '../../global-variables/global-variables';
import { UserModel } from '../../models/user.model';
import { ResponseModel } from '../../models/response.model'

@Injectable()
export class LoginService {

    authUrl: string = GlobalVariables.getInstance().getWebApi();
    storeUser: string = GlobalVariables.getInstance().getStoreUser();
    private user: UserModel = new UserModel();
    private response: ResponseModel = new ResponseModel();
    private token: string;
    private password: string;

    constructor(private http: Http) {}

    authenticate(user: UserModel, path: string): Observable<ResponseModel>{
        let headers = new Headers();
        this.password = user.password;
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        let requestoptions = new RequestOptions({
            headers: headers
        });


        let urlPath: string = this.authUrl + path;

        return this.http
            .post(urlPath, JSON.stringify(user), requestoptions)
            .map((res: Response) => {
                let resp = res.json();
                if(resp.status === 'success'){
                    this.user = resp.data;
                    this.user.password = this.password;
                    this.token = resp.auth_token;
                    localStorage.setItem(this.storeUser, JSON.stringify({ user: this.user, token: this.token }));
                    this.response.status = resp.status;
                    this.response.message = resp.message;
                    return this.response;
                }else{
                    this.response.status = "fail";
                    this.response.message = resp.message;
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

    getUser(): UserModel{
        return this.user;
    }

    getToken():string{
        return this.token;
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        this.user = null;
        localStorage.removeItem(this.storeUser);
    }

}
