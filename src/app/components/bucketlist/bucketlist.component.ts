import { Component } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { LogoutService } from '../../services/http-calls/logout.service';
import { WebApiPathService } from '../../services/shared-information/webapi-path.service';
import { GetUserDetails } from '../../services/shared-information/user-details.service';

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
        private webApiPathService: WebApiPathService,
        private getUserDetails: GetUserDetails){}

    logout(){
        this.logoutService.logout(this.webApiPathService.getWebApiPath('logout').path, this.getUserDetails.gettoken())
        .subscribe(response => {
            if(response.status === "success"){
                this.snackBar.open("Successful Logout", '', {duration: 2000});
                console.log("Successful Logout", response.message);
                this.router.navigate(['/login']);
            }else{
                this.snackBar.open(response.message, '', {duration: 2000});
                console.log('Failure logging out:', response.message);
            }
        },
        errMsg => {
            this.snackBar.open(errMsg, '', {duration: 2000});
            console.log('Failure logging out:', errMsg);
        });
    }
}