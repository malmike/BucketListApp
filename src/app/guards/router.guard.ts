import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { CurrentUserModel } from '../models/current-user.model';
import { GlobalVariables } from '../global-variables/global-variables';

export class Permissions{
    canLoadChildren(currentUser: CurrentUserModel): boolean{
        if (currentUser !== null){
            if (currentUser.user !== null &&currentUser.token !== null){
                return true;
            }
        }
        return false;
    }
}

@Injectable()
export class CanLoadGuard implements CanLoad{

    constructor(
        private permissions: Permissions
    ) {
    }

    canLoad(): boolean | Observable<boolean> | Promise<boolean> {
        let currentUser: CurrentUserModel = JSON.parse(localStorage.getItem(GlobalVariables.getInstance().getStoreUser()));
        return this.permissions.canLoadChildren(currentUser);
    }
}

@Injectable()
export class CanActivateGuard implements CanActivate{

    constructor(
        private router: Router,
        private permissions: Permissions
    ) {
    }

    canActivate(): boolean | Observable<boolean> | Promise<boolean> {
        let currentUser: CurrentUserModel = JSON.parse(localStorage.getItem(GlobalVariables.getInstance().getStoreUser()));
        console.log(currentUser);
        if(this.permissions.canLoadChildren(currentUser)){
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }
}