// External Dependencies
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';

// Services
import { GetBucketlistService } from '../../services/http-calls/get-bucketlist.service';
import { WebApiPathService } from '../../services/shared-information/webapi-path.service';
import { GetUserDetails } from '../../services/shared-information/user-details.service';

// Models
import { BucketlistModel } from '../../models/bucketlist.model';
import { BucketlistItemModel } from '../../models/bucketlist_item.model';
import { CurrentUserModel } from '../../models/current-user.model';


// Global Variables
import { GlobalVariables } from '../../global-variables/global-variables';

@Component({
    selector: 'bucketlistitem',
    templateUrl: './bucketlist-item.component.html',
    styleUrls: ['./bucketlist-item.component.css']
})

export class BucketlistItemComponent implements OnInit{
    editbucketlistForm: FormGroup;
    active:boolean = true;
    edit: boolean = false;
    bucketlist: BucketlistModel = new BucketlistModel();
    private bucketlist_item: Array<BucketlistItemModel> = new Array<BucketlistItemModel>();

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private snackBar: MdSnackBar,
        private webApiPathService: WebApiPathService,
        private getBucketlistService: GetBucketlistService,
        private user_details: GetUserDetails
    ){}

    buildForm(): void {
        console.log(this.bucketlist.name)
        this.editbucketlistForm = this.fb.group({
            'name': ["", Validators.minLength(3)]
        });

        this.editbucketlistForm.valueChanges
            .subscribe(data => this.onValueChanged(data));

        this.onValueChanged();
    }

     onValueChanged(data?: any){
        if(!this.editbucketlistForm) { return; }
        const form = this.editbucketlistForm;

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

    ngOnInit(): void {
        this.getBucketlist();
        this.buildForm();
    }

    getBucketlist(){
        let id = localStorage.getItem(GlobalVariables.getInstance().getBucketlistId());
        let urlPath: string = this.webApiPathService.getWebApiPath('bucketlist').path+'/'+id;
        this.getBucketlistService.getBucketlist(urlPath,  this.user_details.gettoken(), Number(id))
            .subscribe(response => {
                if (response.status === "success") {
                    this.snackBar.open(response.message, '', {
                        duration: 2000,
                    });
                    this.bucketlist = this.getSingleBucketList();
                    console.log('Successful getting of bucketlist:', response.message);
                    this.bucketlist_item = this.bucketlist.bucketlist_items;
                    console.log(this.bucketlist_item);
                }else{
                    this.snackBar.open(response.message, '', {
                        duration: 2000,
                    });
                    console.log('Failure getting bucketlist:', response.message);
                }
            },
            errMsg => {
                this.snackBar.open(errMsg, '', {
                        duration: 2000,
                });
                console.log('Failure getting bucketlist:', errMsg);
            });
    }

    getSingleBucketList(): BucketlistModel{
        return this.getBucketlistService.getSingleBucketlist();
    }

    canEdit(){
        this.edit = true;
    }

    cancel(){
        this.edit = false;
    }
}