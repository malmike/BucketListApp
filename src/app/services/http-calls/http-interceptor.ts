import { Http, Response, RequestOptions, RequestMethod, RequestOptionsArgs, Headers, ConnectionBackend } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/mergeMap';


export abstract class HttpInterceptor extends Http{
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
        req_url: string, token: string): Observable<Response>{
        let header = this.getTokenHeader();
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

    get(url: string, options?: RequestOptionsArgs, noIntercept?: boolean):Observable<Response>{
        this.request_url = url;
        this.request_options = options;
        this.request_method = RequestMethod.Get;
        if(noIntercept) return super.get(url, options);
        return this.intercept(super.get(url, options));
    }

    post(url: string, body:any, options?: RequestOptionsArgs, noIntercept?: boolean):Observable<Response>{
        this.request_url = url;
        this.request_options = options;
        this.request_method = RequestMethod.Post;
        this.request_body = body;
        if(noIntercept) return super.post(url, body, options);
        return this.intercept(super.post(url, body, options));
    }

    put(url: string, body:any, options?: RequestOptionsArgs, noIntercept?: boolean):Observable<Response>{
        this.request_url = url;
        this.request_options = options;
        this.request_method = RequestMethod.Put;
        this.request_body = body;
        if(noIntercept) return super.put(url, body, options);
        return this.intercept(super.put(url, body, options));
    }

    delete(url: string, options?: RequestOptionsArgs, noIntercept?: boolean):Observable<Response>{
        this.request_url = url;
        this.request_options = options;
        this.request_method = RequestMethod.Delete;
        if(noIntercept) return super.delete(url, options);
        return this.intercept(super.delete(url, options));
    }

    private intercept(observable: Observable<Response>): Observable<Response>{
        return observable.catch((err, source) => {
            if(err.status === 401){
                let req_method = this.request_method;
                let req_body = this.request_body;
                let req_options = this.request_options;
                let req_url = this.request_url;
                return this.refreshToken().mergeMap(res =>{
                    if(res){
                        let data = res.json();
                        let token = data.auth_token;
                        if(data.auth_token){
                            this.saveToken(token);
                        }
                        return this.requestWithToken(req_method, req_body, req_options, req_url, token)
                    }
                })
            }
            return Observable.throw(err);
        });
    }

    protected abstract saveToken(token: string): string;
    protected abstract refreshToken(): Observable<Response>;
    protected abstract getTokenHeader(): string;

}
