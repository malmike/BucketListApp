// External Modules and Dependencies
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Http, RequestOptions, ConnectionBackend, XHRBackend } from '@angular/http';
import 'hammerjs';

// Modules
import { CustomMaterialModule } from './custom-material.module';

// Components
import { BucketlistComponent } from '../components/bucketlist/bucketlist.component';
import { BucketlistPageComponent } from '../components/bucketlist-page/bucketlist-page.component';
import { BucketlistItemComponent } from '../components/bucketlist-item/bucketlist-item.component';

// Routing Modules
import { BucketlistRoutingModule } from '../routes/bucketlist-routing.module';

// Guards
import { Permissions, CanActivateGuard } from '../guards/router.guard';

// Service
import { HttpInterceptorService } from '../services/http-calls/http-interceptor.service';
import { AddBucketlistService } from '../services/http-calls/add-bucketlist.service';
import { GetBucketlistService } from '../services/http-calls/get-bucketlists.service';
import { DeleteBucketlistService } from '../services/http-calls/delete-bucketlist.service';
import { WebApiPathService } from '../services/shared-information/webapi-path.service';
import { SharedBucketlistService } from '../services/shared-information/shared-bucketlist.service';

export function getHttpInterceptor(backend: ConnectionBackend, defaultOptions: RequestOptions){
    return new HttpInterceptorService(backend, defaultOptions);
}

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
        BucketlistComponent,
        BucketlistPageComponent,
        BucketlistComponent
    ],
    providers: [
        {
            provide: Http,
            useFactory: getHttpInterceptor,
            deps:[XHRBackend, RequestOptions]
        },
        Permissions,
        CanActivateGuard,
        AddBucketlistService,
        GetBucketlistService,
        DeleteBucketlistService,
        WebApiPathService,
        SharedBucketlistService
    ]
})

export class BucketlistModule { }