// External Dependencies
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';

// Models
import { BucketlistModel } from '../../models/bucketlist.model';
import { BucketlistPageModel } from '../../models/bucketlist_page.model';
import { UserModel } from '../../models/user.model';

// Services
import { AddBucketlistService } from '../../services/http-calls/add-bucketlist.service';
import { GetBucketlistsService } from '../../services/http-calls/get-bucketlists.service';
import { DeleteBucketlistService } from '../../services/http-calls/delete-bucketlist.service';
import { WebApiPathService } from '../../services/shared-information/webapi-path.service';
import { GetUserDetails } from '../../services/shared-information/user-details.service';

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
    delete:boolean = false;
    bucketlist: BucketlistModel = new BucketlistModel();
    bucketlists: Array<BucketlistModel> = new Array<BucketlistModel>();
    bucketlist_page: BucketlistPageModel = new BucketlistPageModel();
    user: UserModel = new UserModel()
    user_name:string = "";


    ngOnInit(): void {
        this.getUser();
        this.buildForm();
        this.getBucketLists();
    }

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private snackBar: MdSnackBar,
        private addBucketlistService: AddBucketlistService,
        private webApiPathService: WebApiPathService,
        private getBucketlistsService: GetBucketlistsService,
        private deleteBucketlistService: DeleteBucketlistService,
        private user_details: GetUserDetails){}

    buildForm(): void {
         this.addbucketlistForm = this.fb.group({
            'name': [null, Validators.minLength(3)]
        });

        this.addbucketlistForm.valueChanges
            .subscribe(data => this.onValueChanged(data));

        this.onValueChanged();
    }

    getUser(){
        this.user = this.user_details.getUser();
        this.user_name = this.user.fname+" "+this.user.lname;
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
            'minlength': 'Bucketlist name must be at least 3 characters long.'
        }
    }

    onSubmitForm(){
        this.bucketlist = this.addbucketlistForm.value;
        this.addbucketlistForm.controls.name.setValue("");
        this.addBucketlistService.addBucketlist(this.bucketlist, this.webApiPathService.getWebApiPath('bucketlist').path, this.user_details.gettoken())
            .subscribe(response => {
                if (response.status === "success") {
                    this.snackBar.open(response.message, '', {
                        duration: 2000,
                    });
                    console.log("Successful adding of bucketlist:", response.message);
                    this.getBucketLists();
                }else{
                    this.snackBar.open(response.message, '', {
                        duration: 2000,
                    });
                    console.log("Failure adding bucketlist:", response.message);
                }
            },
            errMsg => {
                this.snackBar.open(errMsg, '', {
                        duration: 2000,
                });
                console.log("Failure adding bucketlist:", errMsg);
            });
    }

    getBucketLists(query: string = null){
        let urlPath: string = this.webApiPathService.getWebApiPath('bucketlist').path;
        if(query !== null ){
            urlPath += query;
        }
        this.getBucketlistsService.getBucketlists(urlPath, this.user_details.gettoken())
            .subscribe(response => {
                if (response.status === "success") {
                    this.snackBar.open(response.message, '', {
                        duration: 2000,
                    });
                    this.bucketlist_page = this.getBucketListPage();
                    console.log('Successful gettting of bucketlists:', response.message);
                    this.bucketlists = this.bucketlist_page.data;
                }else{
                    this.snackBar.open(response.message, '', {
                        duration: 2000,
                    });
                    if (response.message =="User has no single bucketlist"){
                        this.bucketlists = [];
                    }
                    console.log('Failure getting bucketlists:', response.message);
                }
            },
            errMsg => {
                this.snackBar.open(errMsg, '', {
                        duration: 2000,
                });
                if(errMsg=="User has no single bucketlist"){
                    this.bucketlists = [];
                }
                console.log('Failure getting bucketlists:', errMsg);
            });
    }

    getBucketListPage(): BucketlistPageModel{
        return this.getBucketlistsService.getBucketlistPage();
    }

    navBucketlistItem(id:number, name:string){
        if(this.delete){
            this.delete = false;
        }else{
            localStorage.setItem(
                GlobalVariables.getInstance().getBucketlistDetails(),
                JSON.stringify({ id: id.toString(), name: name})
            );
            this.router.navigate(['/bucketlistitem']);
        }
    }

    deleteBucketlist(id:number){
        this.delete = true;
        let urlPath = this.webApiPathService.getWebApiPath('bucketlist').path + '/' + id;
        this.deleteBucketlistService.deleteBucketlist(urlPath, this.user_details.gettoken())
            .subscribe(response => {
                if (response.status === "success"){
                    this.snackBar.open( response.message, '', {
                        duration: 2000,
                    });
                    console.log("Successful deleting of bucketlist:", response.message)
                    this.getBucketLists();
                }else{
                    this.snackBar.open( response.message, '', {
                        duration: 2000,
                    });
                    console.log('Failure deleting bucketlists:', response.message);
                }
            },
            errMsg => {
                this.snackBar.open(errMsg, '', {
                        duration: 2000,
                });
                console.log('Failure deleting bucketlists:', errMsg);
            });
    }

}