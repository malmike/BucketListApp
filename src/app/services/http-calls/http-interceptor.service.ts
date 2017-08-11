import { Injectable } from '@angular/core';
import { Response, RequestOptions, ConnectionBackend } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { HttpInterceptor } from './http-interceptor';

import { CurrentUserModel } from '../../models/current-user.model';

@Injectable()
export class HttpInterceptorService extends HttpInterceptor{
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
        throw new Error("Method not implemented.");
    }
}