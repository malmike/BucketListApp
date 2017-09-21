import { Component } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { LogoutService } from '../../services/http-calls/logout.service';
import { WebApiPathService } from '../../services/shared-information/webapi-path.service';

@Component({
    selector: 'bucketlist',
    templateUrl: './bucketlist.component.html',
    styleUrls: ['./bucketlist.component.css']
})

export class BucketlistComponent{
    constructor(
        private logoutService: LogoutService,
        private router: Router,
        private snackBar: MdSnackBar,
        private webApiPathService: WebApiPathService){}

    logout(){
        this.logoutService.logout(this.webApiPathService.getWebApiPath('logout').path)
        .subscribe(response => {
            this.snackBar.open("Successful Logout", '', {duration: 2000});
            this.router.navigate(['/login']);
        },
        errMsg => {
            this.snackBar.open(errMsg, '', {duration: 2000});
        });
    }
}