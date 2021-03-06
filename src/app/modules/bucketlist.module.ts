// External Modules and Dependencies
import { NgModule, Inject } from '@angular/core';
import { MdDialog } from '@angular/material';
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
import { UpdateItemDialogComponent } from '../components/update-item-dialog-component/update-item-dialog.component';
import { DeleteDialogComponent } from '../components/delete-dialog/delete-dialog.component';

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
import { DeleteItemService } from '../services/http-calls/delete-item.service';
import { WebApiPathService } from '../services/shared-information/webapi-path.service';
import { GetUserDetails } from '../services/shared-information/user-details.service';
import { UpdateBucketlistService } from '../services/http-calls/update-bucketlist.service';
import { UpdateBucketlistItemService } from '../services/http-calls/update-bucketlist-item.service';
import { LogoutService } from '../services/http-calls/logout.service';
import { HandleErrorsService } from '../services/shared-information/handle-errors.service';
import { GenerateHeadersService } from '../services/shared-information/generate-headers.service';
import { PageService } from '../services/shared-information/page.service';
import { AddItemDialogService } from '../services/dialogs/add-item-dialog.service';
import { UpdateItemDialogService } from '../services/dialogs/update-item-dialog.service';
import { DeleteDialogService } from '../services/dialogs/delete-dialog.service';

export function getHttpInterceptor(backend: ConnectionBackend, defaultOptions: RequestOptions){
    return new HttpInterceptorService(backend, defaultOptions);
}

export function addItemDialgService(dialog: MdDialog){
    return new AddItemDialogService(dialog);
}

export function updatetemDialgService(dialog: MdDialog){
    return new UpdateItemDialogService(dialog);
}

export function deleteDialgService(dialog: MdDialog){
    return new DeleteDialogService(dialog);
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
        AddItemDialogComponent,
        UpdateItemDialogComponent,
        DeleteDialogComponent
    ],
    declarations: [
        AddItemDialogComponent,
        BucketlistComponent,
        BucketlistPageComponent,
        BucketlistItemComponent,
        UpdateItemDialogComponent,
        DeleteDialogComponent
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
            provide: UpdateItemDialogService,
            useFactory: updatetemDialgService,
            deps:[MdDialog]
        },
        {
            provide: DeleteDialogService,
            useFactory: deleteDialgService,
            deps:[MdDialog]
        },
        GetUserDetails,
        Permissions,
        CanActivateGuard,
        AddBucketlistService,
        AddBucketlistItemService,
        GetBucketlistsService,
        GetBucketlistService,
        LogoutService,
        UpdateBucketlistService,
        UpdateBucketlistItemService,
        DeleteBucketlistService,
        DeleteItemService,
        WebApiPathService,
        HandleErrorsService,
        GenerateHeadersService,
        PageService
    ],
    entryComponents: [
        AddItemDialogComponent,
        UpdateItemDialogComponent,
        DeleteDialogComponent
    ]
})

export class BucketlistModule { }