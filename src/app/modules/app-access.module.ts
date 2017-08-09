// External Modules and Dependencies
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import 'hammerjs';

// Modules
import { CustomMaterialModule } from './custom-material.module';

// Components
import { LoginComponent } from '../components/app-access/login/login.component';
import { RegistrationComponent } from '../components/app-access/registration/registration.component';

// Routing Modules
import { AppAccessRoutingModule } from '../routes/app-access-routing.module';

// Service
import { WebApiPathService } from '../services/shared-information/webapi-path.service';
import { RegistrationService } from '../services/http-calls/registration.service';
import { LoginService } from '../services/http-calls/login.service';

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        AppAccessRoutingModule,
        CustomMaterialModule
    ],
    declarations: [
        LoginComponent,
        RegistrationComponent
    ],
    providers: [
        WebApiPathService,
        RegistrationService,
        LoginService
    ]
})

export class AppAccessModule { }