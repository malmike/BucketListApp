// External Modules and Dependencies
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule  } from '@angular/forms';

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
        ReactiveFormsModule,
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