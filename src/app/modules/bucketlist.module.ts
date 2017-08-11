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

// Routing Modules
import { BucketlistRoutingModule } from '../routes/bucketlist-routing.module';

// Guards
import { Permissions, CanActivateGuard } from '../guards/router.guard';

// Service
import { HttpInterceptorService } from '../services/http-calls/http-interceptor.service';

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
        BucketlistPageComponent
    ],
    providers: [
        {
            provide: Http,
            useFactory: getHttpInterceptor,
            deps:[XHRBackend, RequestOptions]
        },
        Permissions,
        CanActivateGuard
    ]
})

export class BucketlistModule { }