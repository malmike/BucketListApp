import { Injectable }    from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { GlobalVariables } from '../../global-variables/global-variables';
import { UserModel } from '../../models/user.model';

@Injectable()
export class LoginService {

    authUrl:string = GlobalVariables.getInstance().getWebApi();
    private user: UserModel = new UserModel();
    private token: string;
    private password: string;

    constructor(private http: Http) {}

    authenticate(user: UserModel, path: string): Observable<string>{
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
                let response = res.json();
                if(response.status === 'success'){
                    this.user = response.data;
                    this.user.password = this.password;
                    this.token = response.token;
                    localStorage.setItem('currentUser', JSON.stringify({ user: this.user, token: this.token }));
                    return response.message;
                }else{
                    return response.message;
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
        localStorage.removeItem('currentUser');
    }

}
