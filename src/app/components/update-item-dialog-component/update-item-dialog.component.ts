// External Dependencies
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MdDialogRef } from '@angular/material';
import { IMyDpOptions } from 'mydatepicker';
import { MdSnackBar } from '@angular/material';

// Services
import { UpdateBucketlistItemService } from '../../services/http-calls/update-bucketlist-item.service';
import { WebApiPathService } from '../../services/shared-information/webapi-path.service';
import { GetUserDetails } from '../../services/shared-information/user-details.service';

//Models
import { BucketlistItemModel } from '../../models/bucketlist_item.model';

// Global Variables
import { GlobalVariables } from '../../global-variables/global-variables';


@Component({
    selector: 'update-item',
    templateUrl: './update-item-dialog.component.html',
    styleUrls: ['./update-item-dialog.component.css']
})

export class UpdateItemDialogComponent implements OnInit{
    updateItemForm: FormGroup;
    active: boolean = true;
    edit: boolean = false;
    private today: Date = new Date();
    public bucketlist_item: BucketlistItemModel;
    public bucketlist_id: string;

    constructor(
        public dialogRef: MdDialogRef<UpdateItemDialogComponent>,
        private fb: FormBuilder,
        private snackBar: MdSnackBar,
        private user_details: GetUserDetails,
        private webApiPathService: WebApiPathService,
        private updateBucketlistItemService: UpdateBucketlistItemService){}

    ngOnInit(): void {
        this.buildForm();
    }

    buildForm(): void {
        this.updateItemForm = this.fb.group({
            'name': [this.bucketlist_item.name,[
                Validators.required,
                Validators.minLength(3)]],
            'completed': [this.bucketlist_item.completed]
        });
        this.updateItemForm.valueChanges
            .subscribe(data => this.onValueChanged(data));

        this.onValueChanged();
    }

    onValueChanged(data?: any){
        if(!this.updateItemForm) { return; }
        const form = this.updateItemForm;

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
            'required': 'Bucketlist Item name required',
            'minlength': 'Name minimum length 3 characters.'
        }
    }

    updateItem(){
        let item: BucketlistItemModel = this.updateItemForm.value;
        let urlPath = this.webApiPathService.getWebApiPath('bucketlist').path+'/'+this.bucketlist_id+'/items/'+this.bucketlist_item.id;
        if(item.name === this.bucketlist_item.name && item.completed === this.bucketlist_item.completed){
            this.close()
            this.snackBar.open('Nothing to update', '', {duration: 2000});
        }else{
            this.updateBucketlistItemService.updateBucketlistItem(item, urlPath, this.user_details.gettoken())
            .subscribe(response =>{
                if(response.status === "success"){
                    this.snackBar.open(response.message, '', {duration: 2000});
                    console.log('Successful updating of bucketlist item:', response.message);
                    this.bucketlist_item = this.updateBucketlistItemService.getItem();
                    this.close()
                }else{
                    this.snackBar.open(response.message, '', {duration: 2000});
                    console.log('Failure updating bucketlist item:', response.message);
                    this.close()
                }
            },
            errMsg => {
                this.snackBar.open(errMsg, '', {duration: 2000});
                console.log('Failure updating bucketlist item:', errMsg);
                this.close()
            });
        }
    }

    close(){
        this.dialogRef.close(this.bucketlist_item);
    }

    to_edit(){
        this.edit = true;
    }

    go_back(){
        this.edit = false;
    }

}
