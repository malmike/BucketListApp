import { Injectable }    from '@angular/core';
import { Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';

import { GlobalVariables } from '../../global-variables/global-variables';
import { GetUserDetails } from './user-details.service';

@Injectable()
export class GenerateHeadersService {

    constructor(
        private user_details: GetUserDetails){}

    public getHeaders(get_token?:boolean): RequestOptionsArgs {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        if(get_token)headers.append(GlobalVariables.getInstance().getTokenHeader(), this.user_details.gettoken());
        headers.append('Accept', 'application/json');
        let requestoptions = new RequestOptions({
            headers: headers
        });
        return requestoptions;;
    }
}
