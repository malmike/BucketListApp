// External Dependencies
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';

// Models
import { BucketlistModel } from '../../models/bucketlist.model';
import { BucketlistPageModel } from '../../models/bucketlist_page.model';
import { CurrentUserModel } from '../../models/current-user.model';
import { UserModel } from '../../models/user.model';

// Services
import { AddBucketlistService } from '../../services/http-calls/add-bucketlist.service';
import { GetBucketlistService } from '../../services/http-calls/get-bucketlists.service'
import { WebApiPathService } from '../../services/shared-information/webapi-path.service';
import { SharedBucketlistService } from '../../services/shared-information/shared-bucketlist.service';

// Global Variables
import { GlobalVariables } from '../../global-variables/global-variables';

@Component({
    selector: 'bucketlistpage',
    templateUrl: './bucketlist-page.component.html',
    styleUrls: ['./bucketlist-page.component.css']
})

export class BucketlistPageComponent implements OnInit{
    addbucketlistForm: FormGroup;
    active:boolean = true;
    bucketlist: BucketlistModel = new BucketlistModel();
    bucketlists: Array<BucketlistModel> = new Array<BucketlistModel>();
    bucketlist_page: BucketlistPageModel = new BucketlistPageModel();
    currentUser: CurrentUserModel = JSON.parse(localStorage.getItem(GlobalVariables.getInstance().getStoreUser()));
    user:UserModel = this.currentUser.user;
    user_name = this.user.fname+" "+this.user.lname;


    ngOnInit(): void {
        this.buildForm();
        this.getBucketLists();
    }

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private snackBar: MdSnackBar,
        private addBucketlistService: AddBucketlistService,
        private webApiPathService: WebApiPathService,
        private getBucketlistService: GetBucketlistService,
        private sharedBucketlistService: SharedBucketlistService){}

    buildForm(): void {
         this.addbucketlistForm = this.fb.group({
            'name': [null,[
                Validators.required,
                Validators.minLength(3)
            ]]
        });

        this.addbucketlistForm.valueChanges
            .subscribe(data => this.onValueChanged(data));

        this.onValueChanged();
    }

     onValueChanged(data?: any){
        if(!this.addbucketlistForm) { return; }
        const form = this.addbucketlistForm;

        for(const field in this.formErrors){
            //Clear previous error messages (if any)
            this.formErrors[field] = '';
            const control = form.get(field);
            if(control && control.dirty && !control.valid){
                const messages = this.validationMessages[field];
                for(const key in control.errors){
                    this.formErrors[field] = messages[key];
                }
            }
        }
    }

    formErrors = {
        'name': ''
    };

    validationMessages = {
        'name': {
            'required': 'Bucketlist name is required.',
            'minlength': 'Bucketlist name must be at least 3 characters long.'
        }
    }

    onSubmitForm(){
        this.bucketlist = this.addbucketlistForm.value;
        this.addBucketlistService.addBucketlist(this.bucketlist, this.webApiPathService.getWebApiPath('bucketlist').path, this.currentUser.token)
            .subscribe(response => {
                if (response.status === "success") {
                    console.log(response.message);
                    this.snackBar.open(response.message, '', {
                        duration: 2000,
                    });
                    this.getBucketLists();
                }else{
                    this.snackBar.open(response.message, '', {
                        duration: 2000,
                    });
                    console.log(response.message);
                }
            },
            errMsg => {
                this.snackBar.open(errMsg, '', {
                        duration: 2000,
                });
                console.log(errMsg);
            });
    }

    getBucketLists(query: string = null){
        let urlPath: string = this.webApiPathService.getWebApiPath('bucketlist').path;
        if(query !== null ){
            urlPath += query;
        }
        this.getBucketlistService.getBucketlists(urlPath, this.currentUser.token)
            .subscribe(response => {
                if (response) {
                    this.snackBar.open('Bucket List Retrieved,', '', {
                        duration: 2000,
                    });
                    this.bucketlist_page = this.getBucketListPage();
                    this.bucketlists = this.bucketlist_page.data;
                }else{
                    this.snackBar.open('No bucketlists', '', {
                        duration: 2000,
                    });
                    console.log('No bucketlists');
                }
            },
            errMsg => {
                this.snackBar.open(errMsg, '', {
                        duration: 2000,
                });
                console.log(errMsg);
            });
    }

    getBucketListPage(): BucketlistPageModel{
        return this.getBucketlistService.getBucketlistPage();
    }

    navBucketlistItem(id:number){
        let bucketlist = this.bucketlists.find(item => item.id === id);
        this.sharedBucketlistService.setBucketlist(bucketlist);
    }

}