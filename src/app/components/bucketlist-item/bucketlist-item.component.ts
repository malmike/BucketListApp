// External Dependencies
import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';

// Services
import { GetBucketlistService } from '../../services/http-calls/get-bucketlist.service';
import { UpdateBucketlistService } from '../../services/http-calls/update-bucketlist.service';
import { UpdateBucketlistItemService } from '../../services/http-calls/update-bucketlist-item.service';
import { DeleteItemService } from '../../services/http-calls/delete-item.service';
import { WebApiPathService } from '../../services/shared-information/webapi-path.service';
import { GetUserDetails } from '../../services/shared-information/user-details.service';
import { AddItemDialogService } from '../../services/dialogs/add-item-dialog.service';
import { UpdateItemDialogService } from '../../services/dialogs/update-item-dialog.service';
import { DeleteDialogService } from '../../services/dialogs/delete-dialog.service';
import { PageService } from '../../services/shared-information/page.service';

// Models
import { BucketlistModel } from '../../models/bucketlist.model';
import { BucketlistItemModel } from '../../models/bucketlist_item.model';
import { CurrentUserModel } from '../../models/current-user.model';

// Global Variables
import { GlobalVariables } from '../../global-variables/global-variables';


@Component({
    selector: 'bucketlistitem',
    templateUrl: './bucketlist-item.component.html',
    styleUrls: ['./bucketlist-item.component.scss']
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
    bucketlist_items: Array<BucketlistItemModel> = new Array<BucketlistItemModel>();
    private token: string;

    constructor(
        private pageService: PageService,
        private fb: FormBuilder,
        private router: Router,
        private snackBar: MdSnackBar,
        private webApiPathService: WebApiPathService,
        private getBucketlistService: GetBucketlistService,
        private updateBucketlistService: UpdateBucketlistService,
        private updateBucketlistItemService: UpdateBucketlistItemService,
        private deleteItemService: DeleteItemService,
        private getUserDetails: GetUserDetails,
        public addItemDialogService: AddItemDialogService,
        public updateItemDialogService: UpdateItemDialogService,
        public deleteDialogService: DeleteDialogService
    ){}

    ngOnInit(): void {
        this.pageService.announcePage("ITEM")
        this.get_token();
        this.getBucketListDetails();
        this.getBucketlist();
        this.buildForm();
    }

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

    private getBucketListDetails(): void{
        let bucketlist_details = JSON.parse(localStorage.getItem(GlobalVariables.getInstance().getBucketlistDetails()));
        this.bucketlist_id = bucketlist_details.id;
        this.bucketlist_name = bucketlist_details.name;
    }

    private get_token(){
        this.token = this.getUserDetails.gettoken();
    }

    private getBucketlist(): void{
        let urlPath: string = this.webApiPathService.getWebApiPath('bucketlist').path+'/'+this.bucketlist_id;
        this.getBucketlistService.getBucketlist(urlPath, this.token)
            .subscribe(response => {
                this.snackBar.open(response.message, '', {
                    duration: 2000,
                });
                this.bucketlist = this.getSingleBucketList();
                this.bucketlist_name = this.bucketlist.name;
                this.bucketlist_items = this.bucketlist.bucketlist_items;
            },
            errMsg => {
                this.snackBar.open(errMsg, '', {
                        duration: 2000,
                });
            });
    }

    private getSingleBucketList(): BucketlistModel{
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
            this.updateBucketlistService.updateBucketlist(this.edit_bucketlist, urlpath, this.token)
                .subscribe(response => {
                    this.snackBar.open(response.message, '', {
                        duration: 2000,
                    });
                    this.bucketlist = this.updateBucketlistService.getBucketlist();
                    this.bucketlist_name = this.bucketlist.name;
                    this.edit = false;
                },
                errMsg => {
                    this.snackBar.open(errMsg, '', {
                            duration: 2000,
                    });
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
            });
    }

    openDeleteDialog(item: string, id: string): void{
        this.delete = true;
        let name: string = "bucket list item " + item;
        let title: string = "BUCKET LIST ITEM";
        this.deleteDialogService
            .deleteItem(title, name)
            .subscribe(res => {
                if(res){
                    this.deleteItem(id)
                }
            });
    }

    openUpdateItemDialog(item: BucketlistItemModel, index: number): void{
        if(this.delete){
            this.delete = false;
        }else {
            this.updateItemDialogService
                .updateBucketlistItem(item, this.bucketlist_id)
                .subscribe(res => {
                    if(res !== undefined && res !== item){
                        this.bucketlist_items[index] = res;
                    }
                });
        }
    }

    deleteItem(id: string): void{
        this.delete = true;
        let urlPath = this.webApiPathService.getWebApiPath('bucketlist').path + '/' + this.bucketlist_id + '/items/' +id;
        this.deleteItemService.deleteItem(urlPath, this.token)
            .subscribe(response => {
                this.snackBar.open( response.message, '', {
                    duration: 2000,
                });
                this.getBucketlist();
            },
            errMsg => {
                this.snackBar.open(errMsg, '', {
                        duration: 2000,
                });
            });
    }

    update_complete(item:BucketlistItemModel, index:number): void{
        this.delete = true;
        item = this.change_completed(item);
        let urlPath = this.webApiPathService.getWebApiPath('bucketlist').path+'/'+this.bucketlist_id+'/items/'+item.id;
        this.updateBucketlistItemService.updateBucketlistItem(item, urlPath, this.token)
        .subscribe(response =>{
            this.snackBar.open(response.message, '', {duration: 2000});
            item = this.updateBucketlistItemService.getItem();
            this.bucketlist_items[index] = item
        },
        errMsg => {
            this.snackBar.open(errMsg, '', {duration: 2000});
            item = this.change_completed(item);
            this.bucketlist_items[index] = item
        });
    }

    change_completed(item:BucketlistItemModel): BucketlistItemModel{
        if(item.completed){
            item.completed = false;
        }else{
            item.completed = true;
        }
        return item;
    }
}
