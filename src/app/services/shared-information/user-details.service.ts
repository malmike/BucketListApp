import { Injectable } from '@angular/core';
import { UserModel } from '../../models/user.model';
import { CurrentUserModel } from '../../models/current-user.model';
import { GlobalVariables } from '../../global-variables/global-variables';

@Injectable()
export class GetUserDetails{

    gettoken(): string{
        let currentUser = JSON.parse(localStorage.getItem(GlobalVariables.getInstance().getStoreUser()));
        return currentUser.token;
    }

    getUser(): UserModel{
        let currentUser = JSON.parse(localStorage.getItem(GlobalVariables.getInstance().getStoreUser()));
        return currentUser.user;
    }
    
}