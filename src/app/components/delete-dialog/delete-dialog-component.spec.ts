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
import { DeleteDialogComponent } from './delete-dialog.component';
import { BucketlistComponent } from '../bucketlist/bucketlist.component';
import { BucketlistPageComponent } from '../bucketlist-page/bucketlist-page.component';
import { BucketlistItemComponent } from '../bucketlist-item/bucketlist-item.component';
import { AppComponent } from '../../app.component';

//global variables
import { GlobalVariables } from '../../global-variables/global-variables';

//test data
import { TestToken, TestUser, buckelist_1} from '../../tests/test.data.spec';
import { MockGetBucketlistService } from '../../tests/mock-get-bucketlist-service.spec';


class MdDialogRefMock {
}

describe('Delete Item Dialog', () => {
    let component: DeleteDialogComponent;
    let fixture: ComponentFixture<DeleteDialogComponent>;

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
                DeleteDialogComponent,
                BucketlistComponent,
                BucketlistPageComponent,
                BucketlistItemComponent
            ],
            providers: [
                {provide: APP_BASE_HREF, useValue: '/my/app'},
                {
                    provide: MdDialogRef,
                    useClass: MdDialogRefMock
                }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        localStorage.setItem(GlobalVariables.getInstance().getStoreUser(), JSON.stringify({ user: TestUser, token: TestToken }));
        fixture = TestBed.createComponent(DeleteDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    })

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
