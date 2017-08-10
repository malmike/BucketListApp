import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { CurrentUserModel } from '../models/current-user.model'

class Permissions{
    canLoadChildren(currentUser: CurrentUserModel): boolean{
        if (currentUser !== null || currentUser !== undefined){
            if (
                currentUser.user !== null || currentUser.user !== undefined &&
                currentUser.token !== null || currentUser.token !== undefined
            ){
                return true;
            }
            return false;
        }
        return false;
    }
}

@Injectable()
export class CanLoadGuard implements CanLoad{

    constructor(private permissions: Permissions, private currentUser: CurrentUserModel) {
        currentUser = JSON.parse(localStorage.getItem('currentUser'))
    }

    canLoad(): boolean | Observable<boolean> | Promise<boolean> {
        return this.permissions.canLoadChildren(this.currentUser);
    }
}

@Injectable()
export class CanActivateGuard implements CanActivate{

    constructor(
        private permissions: Permissions,
        private currentUser: CurrentUserModel,
        private router: Router
    ) {
        currentUser = JSON.parse(localStorage.getItem('currentUser'))
    }

    canActivate(): boolean | Observable<boolean> | Promise<boolean> {
        if (this.permissions.canLoadChildren(this.currentUser)){
            return true;
        }
        this.router.navigate(['/login']);
        return false
    }
}