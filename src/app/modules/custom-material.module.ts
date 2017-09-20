//External modules and dependencies
import { NgModule } from '@angular/core';
import { MdCardModule, MdInputModule, MdButtonModule, MdSnackBarModule, MdDialogModule, MdIconModule, MdCheckboxModule, MdToolbarModule } from '@angular/material';

@NgModule({
  imports: [MdCardModule, MdInputModule, MdButtonModule, MdSnackBarModule, MdDialogModule, MdIconModule, MdCheckboxModule, MdToolbarModule],
  exports: [MdCardModule, MdInputModule, MdButtonModule, MdSnackBarModule, MdDialogModule, MdIconModule, MdCheckboxModule, MdToolbarModule]
})

export class CustomMaterialModule { }