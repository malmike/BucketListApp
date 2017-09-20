//External modules and dependencies
import { NgModule } from '@angular/core';
import { MdCardModule, MdInputModule, MdButtonModule, MdSnackBarModule, MdDialogModule, MdIconModule, MdCheckboxModule } from '@angular/material';

@NgModule({
  imports: [MdCardModule, MdInputModule, MdButtonModule, MdSnackBarModule, MdDialogModule, MdIconModule, MdCheckboxModule],
  exports: [MdCardModule, MdInputModule, MdButtonModule, MdSnackBarModule, MdDialogModule, MdIconModule, MdCheckboxModule]
})

export class CustomMaterialModule { }