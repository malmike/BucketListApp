import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomMaterialModule } from '../../modules/custom-material.module';
import {APP_BASE_HREF} from '@angular/common';
import { HttpModule } from '@angular/http';
import { MdDialogRef } from '@angular/material';
import { BucketlistRoutingModule } from '../../routes/bucketlist-routing.module';
import { AppRoutingModule } from '../../routes/app-routing.module';
import { MyDatePickerModule } from 'mydatepicker';

//components
import { UpdateItemDialogComponent } from './update-item-dialog.component';
import { BucketlistComponent } from '../bucketlist/bucketlist.component';
import { BucketlistPageComponent } from '../bucketlist-page/bucketlist-page.component';
import { BucketlistItemComponent } from '../bucketlist-item/bucketlist-item.component';
import { AppComponent } from '../../app.component';

//services
import { WebApiPathService } from '../../services/shared-information/webapi-path.service';
import { GetUserDetails } from '../../services/shared-information/user-details.service';
import { GenerateHeadersService } from '../../services/shared-information/generate-headers.service';
import { HandleErrorsService } from '../../services/shared-information/handle-errors.service';
import { AddItemDialogService } from '../../services/dialogs/add-item-dialog.service';
import { UpdateBucketlistItemService } from '../../services/http-calls/update-bucketlist-item.service';

//global variables
import { GlobalVariables } from '../../global-variables/global-variables';

//test data
import { TestToken, TestUser, buckelist_1} from '../../tests/test.data.spec';
import { MockGetBucketlistService } from '../../tests/mock-get-bucketlist-service.spec';


class MdDialogRefMock {
}

describe('Update Item Dialog', () => {
    let component: UpdateItemDialogComponent;
    let fixture: ComponentFixture<UpdateItemDialogComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                BrowserAnimationsModule,
                FormsModule,
                ReactiveFormsModule,
                CustomMaterialModule,
                BucketlistRoutingModule,
                AppRoutingModule,
                MyDatePickerModule,
                HttpModule
            ],
            declarations: [
                UpdateItemDialogComponent,
                BucketlistComponent,
                BucketlistPageComponent,
                BucketlistItemComponent
            ],
            providers:[
                {provide: APP_BASE_HREF, useValue: '/my/app'},
                WebApiPathService,
                GenerateHeadersService,
                GetUserDetails,
                HandleErrorsService,
                {
                    provide: MdDialogRef,
                    useClass: MdDialogRefMock
                },
                UpdateBucketlistItemService
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        localStorage.setItem(GlobalVariables.getInstance().getStoreUser(), JSON.stringify({ user: TestUser, token: TestToken }));
        fixture = TestBed.createComponent(UpdateItemDialogComponent);
        component = fixture.componentInstance;
        component.bucketlist_item = buckelist_1;
        fixture.detectChanges();
    })

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
