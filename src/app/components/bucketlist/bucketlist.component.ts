import { Component, OnInit, OnDestroy } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Subscription }   from 'rxjs/Subscription';

import { LogoutService } from '../../services/http-calls/logout.service';
import { WebApiPathService } from '../../services/shared-information/webapi-path.service';
import { GetBucketlistsService } from '../../services/http-calls/get-bucketlists.service';
import { GetUserDetails } from '../../services/shared-information/user-details.service';
import { PageService } from '../../services/shared-information/page.service';

@Component({
    selector: 'bucketlist',
    templateUrl: './bucketlist.component.html',
    styleUrls: ['./bucketlist.component.scss']
})

export class BucketlistComponent implements OnInit, OnDestroy{
    private token: string;
    private subscription: Subscription;
    public page: boolean = false;
    DataTransferItem
    item_nos = [
        {value: 5, viewValue: "5"},
        {value: 10, viewValue: "10"},
        {value: 20, viewValue: "20"},
        {value: 50, viewValue: "50"},
        {value: 100, viewValue: "100"}
    ];

    constructor(
        private pageService: PageService,
        private logoutService: LogoutService,
        private router: Router,
        private snackBar: MdSnackBar,
        private getBucketlistsService: GetBucketlistsService,
        private webApiPathService: WebApiPathService,
        private getUserDetails: GetUserDetails){}

    ngOnInit(): void {
        this.subscription = this.pageService.pageAnnounced$.subscribe(page => {
            if(page === "PAGE") this.page = true;
            if(page === "ITEM") this.page = false;
        })
        this.get_token()
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe()
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

    change_item_no(item_no: number){
        let limit:string = "?limit="+item_no;
        this.pageService.announceLimit(limit);
    }
}