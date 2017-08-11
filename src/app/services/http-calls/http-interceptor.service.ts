import { Injectable } from '@angular/core';
import { Response, RequestOptions, ConnectionBackend } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { HttpInterceptor } from './http-interceptor';

@Injectable()
export class HttpInterceptorService extends HttpInterceptor{
    constructor(
        backend: ConnectionBackend,
        defaultOptions: RequestOptions
    ){
        super(backend, defaultOptions);
    }
}