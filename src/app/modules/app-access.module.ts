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
    ]
})
export class AppAccessModule { }