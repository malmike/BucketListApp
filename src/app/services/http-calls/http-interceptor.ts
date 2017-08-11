import { Http, Response, RequestOptions, RequestMethod, RequestOptionsArgs, Headers, ConnectionBackend } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/mergeMap';


export abstract class HttpInterceptor extends Http{
    // This is the name assigned to the token header in the api
    ;
    // Variable will hold the request object when there is need to resend it
    private request_method: RequestMethod = null;
    private request_body: any = null;
    private request_options: RequestOptionsArgs = null;
    private request_url: string = null;

    constructor(
        backend: ConnectionBackend,
        defaultOptions: RequestOptions
    ) {
        super(backend, defaultOptions);
    }

    private requestWithToken(
        req_method: RequestMethod, req_body: any, req_options: RequestOptionsArgs,
        req_url: string, token: string, header: string): Observable<Response>{
        if(!token){
            return Observable.throw(new Error("No token provided"));
        }
        req_options.headers.set(header, token);

        if (req_method === RequestMethod.Get) return super.get(req_url, req_options);
        if(req_method === RequestMethod.Post) return super.post(req_url, req_body, req_options);
        if(req_method === RequestMethod.Put) return super.put(req_url, req_body, req_options);
        if(req_method === RequestMethod.Delete) return super.delete(req_url, req_options);

        return Observable.throw(new Error("Testing 123"));
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
        this.request_url = url;
        this.request_options = options;
        this.request_method = RequestMethod.Get;
        console.log('Haha, using my get');
        return this.intercept(super.get(url, options));
    }

    post(url: string, body:any, options?: RequestOptionsArgs):Observable<Response>{
        this.request_url = url;
        this.request_options = options;
        this.request_method = RequestMethod.Post;
        this.request_body = body;
        console.log('Haha, using my post');
        return this.intercept(super.post(url, body, options));
    }

    put(url: string, body:any, options?: RequestOptionsArgs):Observable<Response>{
        this.request_url = url;
        this.request_options = options;
        this.request_method = RequestMethod.Put;
        this.request_body = body;
        console.log('Haha, using my put');
        return this.intercept(super.put(url, body, options));
    }

    delete(url: string, body:any, options?: RequestOptionsArgs):Observable<Response>{
        this.request_url = url;
        this.request_options = options;
        this.request_method = RequestMethod.Delete;
        this.request_body = body;
        console.log('Haha, using my delete');
        return this.intercept(super.delete(url, options));
    }

    private intercept(observable: Observable<Response>): Observable<Response>{
        return observable.catch((err, source) => {
            return Observable.throw(err);
        });
    }

    protected abstract saveToken(token: string): Promise<string>;
    protected abstract refreshToken(): Observable<Response>;

}
