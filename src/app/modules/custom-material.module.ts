//External modules and dependencies
import { NgModule } from '@angular/core';
import { MdCardModule, MdInputModule, MdButtonModule } from '@angular/material';

@NgModule({
  imports: [MdCardModule, MdInputModule, MdButtonModule],
  exports: [MdCardModule, MdInputModule, MdButtonModule]
})

export class CustomMaterialModule { }