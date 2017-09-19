// External Dependencies
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MdDialogRef } from '@angular/material';
import { IMyDpOptions } from 'mydatepicker';
import { MdSnackBar } from '@angular/material';

// Services
import { AddBucketlistItemService} from '../../services/http-calls/add-bucketlist-item.service';
import { WebApiPathService } from '../../services/shared-information/webapi-path.service';
import { GetUserDetails } from '../../services/shared-information/user-details.service';

//Models
import { BucketlistItemModel } from '../../models/bucketlist_item.model';

// Global Variables
import { GlobalVariables } from '../../global-variables/global-variables';


@Component({
    selector: 'add-item-dialog',
    templateUrl: './add-item-dialog.component.html',
    styleUrls: ['./add-item-dialog.component.css']
})

export class AddItemDialogComponent implements OnInit{
    additemForm: FormGroup;
    active: boolean = true;
    private today: Date = new Date();
    public bucketlist_id: string;

    constructor(
        public dialogRef: MdDialogRef<AddItemDialogComponent>,
        private fb: FormBuilder,
        private snackBar: MdSnackBar,
        private user_details: GetUserDetails,
        private webApiPathService: WebApiPathService,
        private addBucketlistItemService: AddBucketlistItemService){}

    ngOnInit(): void {
        this.buildForm();
    }

    public myDatePickerOptions: IMyDpOptions = {
        dateFormat: 'yyyy-mm-dd',
        disableUntil: {
            year: this.today.getFullYear(),
            month: this.today.getMonth()+1,
            day: this.today.getDate()-1
        },
        editableDateField: false,
        inline: false
    };

    buildForm(): void {
        this.additemForm = this.fb.group({
            'item_name': [null,[
                Validators.required,
                Validators.minLength(3)]],
            'end_date': [null, Validators.required]
        });
        this.additemForm.valueChanges
            .subscribe(data => this.onValueChanged(data));

        this.onValueChanged();
    }


    onValueChanged(data?: any){
        if(!this.additemForm) { return; }
        const form = this.additemForm;

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
        'item_name': ''
    };

    validationMessages = {
        'item_name': {
            'required': 'Bucketlist Item name required',
            'minlength': 'Bucketlist Item name must be at least 3 characters long.'
        }
    }

    addItem(){
        let data: any = this.additemForm.value;
        let item: BucketlistItemModel = {name: data.item_name, finished_by: data.end_date.formatted};
        let urlPath = this.webApiPathService.getWebApiPath('bucketlist').path+'/'+this.bucketlist_id+'/items/';
        this.addBucketlistItemService.addBucketlistItem(item, urlPath, this.user_details.gettoken())
        .subscribe(response => {
            if (response.status === "success") {
                this.snackBar.open(response.message, '', {
                    duration: 2000,
                });
                console.log('Successful adding of bucketlists item:', response.message);
                this.dialogRef.close(true);
            }else{
                this.snackBar.open(response.message, '', {
                    duration: 2000,
                });
                console.log('Failure adding bucketlists item:', response.message);
                this.dialogRef.close(false);
            }
        },
        errMsg => {
            this.snackBar.open(errMsg, '', {
                duration: 2000,
            });
            console.log('Failure adding bucketlist item:', errMsg);
            this.dialogRef.close(false);
        });
    }

    close(){
        this.dialogRef.close(false);
    }

}
