import { Injectable } from '@angular/core';
import { UserModel } from '../../models/user.model';
import { CurrentUserModel } from '../../models/current-user.model';
import { GlobalVariables } from '../../global-variables/global-variables';

@Injectable()
export class GetUserDetails{
    constructor(private currentUser: CurrentUserModel){}
    gettoken(): string{
        return this.currentUser.token;
    }

    getUser(): UserModel{
        return this.currentUser.user;
    }
}