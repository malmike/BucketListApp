// External modules and dependencies
import { NgModule } from '@angular/core';
import {
  MdSelectModule, MdCardModule, MdInputModule,
  MdButtonModule, MdSnackBarModule, MdDialogModule,
  MdIconModule, MdCheckboxModule, MdToolbarModule, MdMenuModule
} from '@angular/material';

@NgModule({
  imports: [
    MdSelectModule, MdCardModule, MdInputModule,
    MdButtonModule, MdSnackBarModule, MdDialogModule,
    MdIconModule, MdCheckboxModule, MdToolbarModule, MdMenuModule
  ],
  exports: [
    MdSelectModule, MdCardModule, MdInputModule,
    MdButtonModule, MdSnackBarModule, MdDialogModule,
    MdIconModule, MdCheckboxModule, MdToolbarModule, MdMenuModule
  ]
})

export class CustomMaterialModule { }
