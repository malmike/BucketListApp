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
    selector: 'delete-dialog',
    templateUrl: './delete-dialog.component.html',
    styleUrls: ['./delete-dialog.component.scss']
})

export class DeleteDialogComponent implements OnInit{
    private delete: boolean = true;
    public title: string = "";
    public name: string = "";

    constructor(
        public dialogRef: MdDialogRef<DeleteDialogComponent>
    ){}

    ngOnInit(): void {
        console.log(this.title)
    }

    delete_item(){
        this.delete = true;
        this.close();
    }

    cancel(){
        this.delete = false;
        this.close();
    }

    close(){
        this.dialogRef.close(this.delete);
    }
}
