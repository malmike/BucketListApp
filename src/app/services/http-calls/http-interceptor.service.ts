import { Injectable } from '@angular/core';
import { Headers, Response, RequestOptions, ConnectionBackend } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { HttpInterceptor } from './http-interceptor';

import { CurrentUserModel } from '../../models/current-user.model';
import { UserModel } from '../../models/user.model';

import { GlobalVariables } from '../../global-variables/global-variables';

@Injectable()
export class HttpInterceptorService extends HttpInterceptor{

    loginUrl:string = GlobalVariables.getInstance().getLoginUrl();
    tokenHeader:string = GlobalVariables.getInstance().getTokenHeader();
    currentUser: CurrentUserModel = new CurrentUserModel();
    constructor(
        backend: ConnectionBackend,
        defaultOptions: RequestOptions
    ){
        super(backend, defaultOptions);
    }

    protected saveToken(token: string): string {
        let store_user = GlobalVariables.getInstance().getStoreUser();
        this.currentUser = JSON.parse(localStorage.getItem(store_user));
        this.currentUser.token = token;
        localStorage.setItem(store_user, JSON.stringify(this.currentUser));
        return token;
    }

    protected refreshToken(): Observable<Response> {
        this.currentUser = JSON.parse(localStorage.getItem(GlobalVariables.getInstance().getStoreUser()));
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        let requestoptions = new RequestOptions({
            headers: headers
        });
        let user: UserModel = this.currentUser.user;
        let urlPath = this.loginUrl;
        return super.post(urlPath, JSON.stringify(user), requestoptions, true);
    }

    protected getTokenHeader(): string {
        return this.tokenHeader;
    }

}