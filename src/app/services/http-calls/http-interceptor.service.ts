import { Injectable } from '@angular/core';
import { Headers, Response, RequestOptions, ConnectionBackend } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { HttpInterceptor } from './http-interceptor';

import { CurrentUserModel } from '../../models/current-user.model';

import { GlobalVariables } from '../../global-variables/global-variables';

@Injectable()
export class HttpInterceptorService extends HttpInterceptor{

    loginUrl:string = GlobalVariables.getInstance().getLoginUrl();
    currentUser: CurrentUserModel = new CurrentUserModel();
    constructor(
        backend: ConnectionBackend,
        defaultOptions: RequestOptions
    ){
        super(backend, defaultOptions);
    }

    protected saveToken(token: string): Promise<string> {
        this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
        this.currentUser.token = token;
        localStorage.setItem("currentUser", JSON.stringify(this.currentUser));
        throw token;
    }

    protected refreshToken(): Observable<Response> {
        this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        let requestoptions = new RequestOptions({
            headers: headers
        });
        let urlPath = this.loginUrl;
        return super.post(urlPath, JSON.stringify(this.currentUser), requestoptions, false);
    }
}