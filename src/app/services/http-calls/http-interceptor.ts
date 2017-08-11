import { Http, Response, RequestOptions, RequestOptionsArgs, Headers, ConnectionBackend } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/mergeMap';


export abstract class HttpInterceptor extends Http{
    // This is the name assigned to the token header in the api
    private token_header:string = "x-access-token";
    // Variable will hold the request object when there is need to resend it
    private original_request:Request;

    constructor(
        backend: ConnectionBackend,
        defaultOptions: RequestOptions
    ) {
        super(backend, defaultOptions);
    }

    private getRequestOptions(options?: RequestOptionsArgs): RequestOptionsArgs{
        if(options == null){
            options = new RequestOptions();
        }
        if(options.headers == null){
            options.headers = new Headers();
        }
        options.headers.append("Content-Type", "application/json");
        return options;
    }

    get(url: string, options?: RequestOptionsArgs):Observable<Response>{
        console.log('Haha, using my get');
        return super.get(url, options);
    }

    post(url: string, body:any, options?: RequestOptionsArgs):Observable<Response>{
        console.log('Haha, using my post');
        return super.post(url, options);
    }

    put(url: string, body:any, options?: RequestOptionsArgs):Observable<Response>{
        console.log('Haha, using my put');
        return super.put(url, options);
    }

    delete(url: string, body:any, options?: RequestOptionsArgs):Observable<Response>{
        console.log('Haha, using my delete');
        return super.delete(url, options);
    }

}
