import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { UpdateItemDialogComponent } from '../components/update-item-dialog-component/update-item-dialog.component';
import { BucketlistItemModel } from '../models/bucketlist_item.model';

export class MockUpdateItemDialogService{
    updateBucketlistItem(item: BucketlistItemModel, bucketlist_id: string):Observable<BucketlistItemModel>{
        let dialogRef: MdDialogRef<UpdateItemDialogComponent>;
        dialogRef = this.dialog.open(UpdateItemDialogComponent, {
            width: '20em'
        });
        dialogRef.componentInstance.bucketlist_item = item;
        dialogRef.componentInstance.bucketlist_id = bucketlist_id;
        return dialogRef.afterClosed();
    }
}



