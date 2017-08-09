//External modules and dependencies
import { NgModule } from '@angular/core';
import { MdCardModule } from '@angular/material';

@NgModule({
  imports: [MdCardModule],
  exports: [MdCardModule],
})

export class CustomMaterialModule { }