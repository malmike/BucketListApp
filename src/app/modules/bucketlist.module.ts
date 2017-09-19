// External Modules and Dependencies
import { NgModule, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Http, RequestOptions, ConnectionBackend, XHRBackend } from '@angular/http';
import { MyDatePickerModule } from 'mydatepicker';
import 'hammerjs';

// Modules
import { CustomMaterialModule } from './custom-material.module';

// Components
import { BucketlistComponent } from '../components/bucketlist/bucketlist.component';
import { BucketlistPageComponent } from '../components/bucketlist-page/bucketlist-page.component';
import { BucketlistItemComponent } from '../components/bucketlist-item/bucketlist-item.component';
import { AddItemDialogComponent } from '../components/add-item-dialog-component/add-item-dialog.component';

// Routing Modules
import { BucketlistRoutingModule } from '../routes/bucketlist-routing.module';

// Guards
import { Permissions, CanActivateGuard } from '../guards/router.guard';

// Service
import { HttpInterceptorService } from '../services/http-calls/http-interceptor.service';
import { AddBucketlistItemService} from '../services/http-calls/add-bucketlist-item.service';
import { AddBucketlistService } from '../services/http-calls/add-bucketlist.service';
import { GetBucketlistsService } from '../services/http-calls/get-bucketlists.service';
import { GetBucketlistService } from '../services/http-calls/get-bucketlist.service';
import { DeleteBucketlistService } from '../services/http-calls/delete-bucketlist.service';
import { WebApiPathService } from '../services/shared-information/webapi-path.service';
import { GetUserDetails } from '../services/shared-information/user-details.service';
import { UpdateBucketlistService } from '../services/http-calls/update-bucketlist.service';
import { AddItemDialogService } from '../services/dialogs/add-item-dialog.service';
import { MdDialog } from '@angular/material';


//Models
import { CurrentUserModel } from '../models/current-user.model';

//Global Variables
import { GlobalVariables } from '../global-variables/global-variables';

export function getHttpInterceptor(backend: ConnectionBackend, defaultOptions: RequestOptions){
    return new HttpInterceptorService(backend, defaultOptions);
}

export function addItemDialgService(dialog: MdDialog){
    return new AddItemDialogService(dialog);
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
        CustomMaterialModule,
        MyDatePickerModule
    ],
    exports:[
        AddItemDialogComponent
    ],
    declarations: [
        AddItemDialogComponent,
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
            provide: AddItemDialogService,
            useFactory: addItemDialgService,
            deps:[MdDialog]
        },
        {
            provide: GetUserDetails,
            useFactory: getCurrentUser
        },
        Permissions,
        CanActivateGuard,
        AddBucketlistService,
        AddBucketlistItemService,
        GetBucketlistsService,
        GetBucketlistService,
        UpdateBucketlistService,
        DeleteBucketlistService,
        WebApiPathService
    ],
    entryComponents: [
        AddItemDialogComponent
    ]
})

export class BucketlistModule { }