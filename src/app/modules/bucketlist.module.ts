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
import { GetBucketlistsService } from '../services/http-calls/get-bucketlists.service';
import { GetBucketlistService } from '../services/http-calls/get-bucketlist.service';
import { DeleteBucketlistService } from '../services/http-calls/delete-bucketlist.service';
import { WebApiPathService } from '../services/shared-information/webapi-path.service';
import { GetUserDetails } from '../services/shared-information/user-details.service';
import { UpdateBucketlistService } from '../services/http-calls/update-bucketlist.service';

//Models
import { CurrentUserModel } from '../models/current-user.model';

//Global Variables
import { GlobalVariables } from '../global-variables/global-variables';

export function getHttpInterceptor(backend: ConnectionBackend, defaultOptions: RequestOptions){
    return new HttpInterceptorService(backend, defaultOptions);
}

export function getCurrentUser(){
    let currentUser: CurrentUserModel = JSON.parse(localStorage.getItem(GlobalVariables.getInstance().getStoreUser()));
    return new GetUserDetails(currentUser);
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
        BucketlistItemComponent
    ],
    providers: [
        {
            provide: Http,
            useFactory: getHttpInterceptor,
            deps:[XHRBackend, RequestOptions]
        },
        {
            provide: GetUserDetails,
            useFactory: getCurrentUser
        },
        Permissions,
        CanActivateGuard,
        AddBucketlistService,
        GetBucketlistsService,
        GetBucketlistService,
        UpdateBucketlistService,
        DeleteBucketlistService,
        WebApiPathService
    ]
})

export class BucketlistModule { }