//External modules and dependencies
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule  } from '@angular/forms';

//Routing Modules
import { AppAccessRoutingModule } from '../routes/app-access-routing.module';

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        ReactiveFormsModule,
        AppAccessRoutingModule
    ],
    declarations: [
    ],
    providers: [
    ]
})
export class AppAccessModule { }