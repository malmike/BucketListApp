// External Modules and Dependencies
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import 'hammerjs';

// Modules
import { CustomMaterialModule } from './custom-material.module';

// Components
import { BucketlistComponent } from '../components/bucketlist/bucketlist.component'

// Routing Modules
import { BucketlistRoutingModule } from '../routes/bucketlist-routing.module'

// Service


@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        BucketlistRoutingModule,
        CustomMaterialModule
    ],
    declarations: [
        BucketlistComponent
    ],
    providers: [
    ]
})

export class BucketlistModule { }