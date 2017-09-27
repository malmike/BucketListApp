//External modules and dependencies
import { NgModule } from '@angular/core';
import { MdCardModule, MdInputModule, MdButtonModule, MdSnackBarModule, MdDialogModule, MdIconModule, MdCheckboxModule, MdToolbarModule, MdMenuModule } from '@angular/material';

@NgModule({
  imports: [MdCardModule, MdInputModule, MdButtonModule, MdSnackBarModule, MdDialogModule, MdIconModule, MdCheckboxModule, MdToolbarModule, MdMenuModule],
  exports: [MdCardModule, MdInputModule, MdButtonModule, MdSnackBarModule, MdDialogModule, MdIconModule, MdCheckboxModule, MdToolbarModule, MdMenuModule]
})

export class CustomMaterialModule { }