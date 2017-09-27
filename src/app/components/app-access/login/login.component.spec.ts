import { BrowserAnimationsModule } from '@angular/platform-browser/animations';import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomMaterialModule } from '../../../modules/custom-material.module';
import {APP_BASE_HREF} from '@angular/common';
import { HttpModule } from '@angular/http';

import { AppAccessRoutingModule } from '../../../routes/app-access-routing.module';
import { AppRoutingModule } from '../../../routes/app-routing.module';
import { LoginComponent } from './login.component';
import { AppComponent } from '../../../app.component';
import { RegistrationComponent } from '../registration/registration.component';
import { RegExpService } from '../../../services/shared-information/reg-exp.service';
import { WebApiPathService } from '../../../services/shared-information/webapi-path.service';
import { GetUserDetails } from '../../../services/shared-information/user-details.service';
import { GenerateHeadersService } from '../../../services/shared-information/generate-headers.service';
import { HandleErrorsService } from '../../../services/shared-information/handle-errors.service';
import { LoginService } from '../../../services/http-calls/login.service';

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                BrowserAnimationsModule,
                FormsModule,
                ReactiveFormsModule,
                CustomMaterialModule,
                AppAccessRoutingModule,
                AppRoutingModule,
                HttpModule
            ],
            declarations: [
                LoginComponent,
                RegistrationComponent
            ],
            providers:[
                {provide: APP_BASE_HREF, useValue: '/my/app'},
                RegExpService,
                WebApiPathService,
                GenerateHeadersService,
                GetUserDetails,
                HandleErrorsService,
                LoginService
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    })

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

});
