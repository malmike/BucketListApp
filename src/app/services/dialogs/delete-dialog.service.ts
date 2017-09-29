import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';

import { DeleteDialogComponent } from '../../components/delete-dialog/delete-dialog.component';

@Injectable()
export class DeleteDialogService{
    constructor(private dialog: MdDialog){}

    deleteItem(title: string, name: string):Observable<boolean>{
        let dialogRef: MdDialogRef<DeleteDialogComponent>;
        dialogRef = this.dialog.open(DeleteDialogComponent);
        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.name = name;
        return dialogRef.afterClosed();
    }
}



