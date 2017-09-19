//External modules and dependencies
import { NgModule } from '@angular/core';
import { MdCardModule, MdInputModule, MdButtonModule, MdSnackBarModule, MdDialogModule, MdIconModule } from '@angular/material';

@NgModule({
  imports: [MdCardModule, MdInputModule, MdButtonModule, MdSnackBarModule, MdDialogModule, MdIconModule],
  exports: [MdCardModule, MdInputModule, MdButtonModule, MdSnackBarModule, MdDialogModule, MdIconModule]
})

export class CustomMaterialModule { }