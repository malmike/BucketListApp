// External Dependencies
import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';

// Services
import { GetBucketlistService } from '../../services/http-calls/get-bucketlist.service';
import { UpdateBucketlistService } from '../../services/http-calls/update-bucketlist.service';
import { DeleteItemService } from '../../services/http-calls/delete-item.service';
import { WebApiPathService } from '../../services/shared-information/webapi-path.service';
import { GetUserDetails } from '../../services/shared-information/user-details.service';
import { AddItemDialogService } from '../../services/dialogs/add-item-dialog.service';

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
    additemForm: FormGroup;
    active:boolean = true;
    delete:boolean = false;
    edit: boolean = false;
    bucketlist: BucketlistModel = new BucketlistModel();
    bucketlist_name:string = "";
    edit_bucketlist: BucketlistModel = new BucketlistModel();
    bucketlist_id: string = "";
    private bucketlist_items: Array<BucketlistItemModel> = new Array<BucketlistItemModel>();

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private snackBar: MdSnackBar,
        private webApiPathService: WebApiPathService,
        private getBucketlistService: GetBucketlistService,
        private user_details: GetUserDetails,
        private updateBucketlistService: UpdateBucketlistService,
        private deleteItemService: DeleteItemService,
        public addItemDialogService: AddItemDialogService
    ){}

    buildForm(): void {
        this.editbucketlistForm = this.fb.group({
            'name': [this.bucketlist_name,[
                Validators.required,
                Validators.minLength(3)]]
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
        'name': '',
        'item_name': ''
    };

    validationMessages = {
        'name': {
            'required': 'Bucketlist name required',
            'minlength': 'Bucketlist name must be at least 3 characters long.'
        }
    }

    getBucketListDetails(){
        let bucketlist_details = JSON.parse(localStorage.getItem(GlobalVariables.getInstance().getBucketlistDetails()));
        this.bucketlist_id = bucketlist_details.id;
        this.bucketlist_name = bucketlist_details.name;
    }

    ngOnInit(): void {
        this.getBucketListDetails();
        this.getBucketlist();
        this.buildForm();
    }

    getBucketlist(){
        let urlPath: string = this.webApiPathService.getWebApiPath('bucketlist').path+'/'+this.bucketlist_id;
        this.getBucketlistService.getBucketlist(urlPath,  this.user_details.gettoken(), Number(this.bucketlist_id))
            .subscribe(response => {
                if (response.status === "success") {
                    this.snackBar.open(response.message, '', {
                        duration: 2000,
                    });
                    this.bucketlist = this.getSingleBucketList();
                    this.bucketlist_name = this.bucketlist.name;
                    console.log('Successful getting of bucketlist:', response.message);
                    this.bucketlist_items = this.bucketlist.bucketlist_items;
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
        this.editbucketlistForm.controls.name.setValue(this.bucketlist_name);
        this.edit = false;
    }

    updateBucketlistName(){
        let name:string = this.editbucketlistForm.controls.name.value;
        if(name === this.bucketlist_name){
            this.edit = false;
        }else{
            let urlpath = this.webApiPathService.getWebApiPath('bucketlist').path+'/'+this.bucketlist.id;
            this.edit_bucketlist = this.editbucketlistForm.value;
            this.updateBucketlistService.updateBucketlist(this.edit_bucketlist, urlpath, this.user_details.gettoken())
                .subscribe(response => {
                    if (response.status === "success") {
                        this.snackBar.open(response.message, '', {
                            duration: 2000,
                        });
                        console.log('Successful updating of bucketlists:', response.message);
                        this.bucketlist = this.updateBucketlistService.getBucketlist();
                        this.bucketlist_name = this.bucketlist.name;
                        this.edit = false;
                    }else{
                        this.snackBar.open(response.message, '', {
                            duration: 2000,
                        });
                        if (response.message = "Failure updating bucketlist"){
                        }
                        console.log('Failure updating bucketlists:', response.message);
                        this.cancel()
                    }
                },
                errMsg => {
                    this.snackBar.open(errMsg, '', {
                            duration: 2000,
                    });
                    if(errMsg=="User has no single bucketlist"){
                    }
                    console.log('Failure getting bucketlists:', errMsg);
                    this.cancel()
                });
        }
    }

    openAddItemDialog(): void{
        this.addItemDialogService
            .addBucketlistItem(this.bucketlist_id)
            .subscribe(res => {
                if(res){
                    this.getBucketlist()
                }
            })
    }

    deleteItem(id: string): void{
        this.delete = true;
        let urlPath = this.webApiPathService.getWebApiPath('bucketlist').path + '/' + this.bucketlist_id + '/items/' +id;
        this.deleteItemService.deleteItem(urlPath, this.user_details.gettoken())
            .subscribe(response => {
                if (response.status === "success"){
                    this.snackBar.open( response.message, '', {
                        duration: 2000,
                    });
                    console.log("Successful deleting of bucketlist:", response.message)
                    this.getBucketlist();
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
