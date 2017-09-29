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
import { AddItemDialogComponent } from './add-item-dialog.component';
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
import { AddBucketlistItemService } from '../../services/http-calls/add-bucketlist-item.service';
import { MockAddBucketlistItemService } from '../../tests/mock-add-bucketlist-item-service.spec';

//global variables
import { GlobalVariables } from '../../global-variables/global-variables';

//test data
import { TestToken, TestUser} from '../../tests/test.data.spec';
import { MockGetBucketlistService } from '../../tests/mock-get-bucketlist-service.spec';


class MdDialogRefMock {
}

describe('Add Item Dialog', () => {
    let component: AddItemDialogComponent;
    let fixture: ComponentFixture<AddItemDialogComponent>;

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
                AddItemDialogComponent,
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
                { provide: AddBucketlistItemService, useClass: MockAddBucketlistItemService}
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        localStorage.setItem(GlobalVariables.getInstance().getStoreUser(), JSON.stringify({ user: TestUser, token: TestToken }));
        fixture = TestBed.createComponent(AddItemDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    })

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

});
