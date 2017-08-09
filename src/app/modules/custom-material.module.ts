//External modules and dependencies
import { NgModule } from '@angular/core';
import { MdCardModule, MdInputModule, MdButtonModule, MdSnackBarModule } from '@angular/material';

@NgModule({
  imports: [MdCardModule, MdInputModule, MdButtonModule, MdSnackBarModule],
  exports: [MdCardModule, MdInputModule, MdButtonModule, MdSnackBarModule]
})

export class CustomMaterialModule { }