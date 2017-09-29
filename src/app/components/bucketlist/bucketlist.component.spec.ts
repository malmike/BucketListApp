import { BrowserAnimationsModule } from '@angular/platform-browser/animations';import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomMaterialModule } from '../../modules/custom-material.module';
import {APP_BASE_HREF} from '@angular/common';
import { HttpModule } from '@angular/http';
import { BucketlistRoutingModule } from '../../routes/bucketlist-routing.module';
import { AppRoutingModule } from '../../routes/app-routing.module';
import { BucketlistComponent } from '../bucketlist/bucketlist.component';
import { BucketlistItemComponent } from '../bucketlist-item/bucketlist-item.component';
import { BucketlistPageComponent } from '../bucketlist-page/bucketlist-page.component';
import { AppComponent } from '../../app.component';
import { WebApiPathService } from '../../services/shared-information/webapi-path.service';
import { GetUserDetails } from '../../services/shared-information/user-details.service';
import { GenerateHeadersService } from '../../services/shared-information/generate-headers.service';
import { HandleErrorsService } from '../../services/shared-information/handle-errors.service';
import { PageService } from '../../services/shared-information/page.service';
import { LogoutService } from '../../services/http-calls/logout.service';
import { GlobalVariables } from '../../global-variables/global-variables';
import { TestToken, TestUser} from '../../tests/test.data.spec';

describe('Bucketlist', () => {
    let component: BucketlistComponent;
    let fixture: ComponentFixture<BucketlistComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                BrowserAnimationsModule,
                FormsModule,
                ReactiveFormsModule,
                CustomMaterialModule,
                BucketlistRoutingModule,
                AppRoutingModule,
                HttpModule
            ],
            declarations: [
                BucketlistComponent,
                BucketlistItemComponent,
                BucketlistPageComponent
            ],
            providers:[
                {provide: APP_BASE_HREF, useValue: '/my/app'},
                WebApiPathService,
                GenerateHeadersService,
                GetUserDetails,
                HandleErrorsService,
                LogoutService,
                PageService
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        localStorage.setItem(GlobalVariables.getInstance().getStoreUser(), JSON.stringify({ user: TestUser, token: TestToken }));
        fixture = TestBed.createComponent(BucketlistComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    })

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

});
