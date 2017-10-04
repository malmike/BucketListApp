import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';

import { AddItemDialogComponent } from '../../components/add-item-dialog-component/add-item-dialog.component';

@Injectable()
export class AddItemDialogService{
    constructor(private dialog: MdDialog){}

    addBucketlistItem(bucketlist_id: string):Observable<boolean>{
        let dialogRef: MdDialogRef<AddItemDialogComponent>;
        dialogRef = this.dialog.open(AddItemDialogComponent);
        dialogRef.componentInstance.bucketlist_id = bucketlist_id;

        return dialogRef.afterClosed();
    }
}



