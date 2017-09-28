import { Component, OnInit } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { LogoutService } from '../../services/http-calls/logout.service';
import { WebApiPathService } from '../../services/shared-information/webapi-path.service';
import { GetUserDetails } from '../../services/shared-information/user-details.service';

@Component({
    selector: 'bucketlist',
    templateUrl: './bucketlist.component.html',
    styleUrls: ['./bucketlist.component.scss']
})

export class BucketlistComponent implements OnInit{
    private token: string;

    constructor(
        private logoutService: LogoutService,
        private router: Router,
        private snackBar: MdSnackBar,
        private webApiPathService: WebApiPathService,
        private getUserDetails: GetUserDetails){}

    ngOnInit(): void {
        this.get_token()
    }

    private get_token(){
        this.token = this.getUserDetails.gettoken();
    }

    logout(){
        this.logoutService.logout(this.webApiPathService.getWebApiPath('logout').path, this.token)
        .subscribe(response => {
            this.snackBar.open("Successful Logout", '', {duration: 2000});
            this.router.navigate(['/login']);
        },
        errMsg => {
            this.snackBar.open(errMsg, '', {duration: 2000});
        });
    }

    home(){
        this.router.navigate(['/bucketlist']);
    }
}