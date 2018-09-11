import { Injectable }    from '@angular/core';
import { Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';

import { GlobalVariables } from '../../global-variables/global-variables';
import { GetUserDetails } from './user-details.service';

@Injectable()
export class GenerateHeadersService {

    constructor(
        private user_details: GetUserDetails){}

    public getHeaders(token?: string): RequestOptionsArgs {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        if(token)headers.append(GlobalVariables.getInstance().getTokenHeader(), token);
        headers.append('Accept', 'application/json');
        let requestoptions = new RequestOptions({
            headers: headers
        });
        return requestoptions;
    }
}
