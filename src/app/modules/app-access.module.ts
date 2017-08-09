//External modules and dependencies
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule  } from '@angular/forms';

//Components
import { RegistrationComponent } from '../components/app-access/registration/registration.component';

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
        RegistrationComponent
    ],
    providers: [
    ]
})
export class AppAccessModule { }