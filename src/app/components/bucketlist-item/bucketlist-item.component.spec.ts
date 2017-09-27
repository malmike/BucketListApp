// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { CustomMaterialModule } from '../../modules/custom-material.module';
// import {APP_BASE_HREF} from '@angular/common';
// import { HttpModule } from '@angular/http';

// import { BucketlistRoutingModule } from '../../routes/bucketlist-routing.module';
// import { AppRoutingModule } from '../../routes/app-routing.module';
// import { BucketlistItemComponent } from './bucketlist-item.component';
// import { AppComponent } from '../../app.component';
// import { BucketlistPageComponent } from '../bucketlist-page/bucketlist-page.component';
// import { BucketlistComponent } from '../bucketlist/bucketlist.component';
// import { WebApiPathService } from '../../services/shared-information/webapi-path.service';
// import { GetUserDetails } from '../../services/shared-information/user-details.service';
// import { GenerateHeadersService } from '../../services/shared-information/generate-headers.service';
// import { HandleErrorsService } from '../../services/shared-information/handle-errors.service';
// import { RouterLinkStubDirective } from '../router-stubs';


// describe('BucketlistItemComponent', () => {
//     let component: BucketlistItemComponent;
//     let fixture: ComponentFixture<BucketlistItemComponent>;

//     beforeEach(async(() => {
//         TestBed.configureTestingModule({
//             imports: [
//                 BrowserAnimationsModule,
//                 FormsModule,
//                 ReactiveFormsModule,
//                 CustomMaterialModule,
//                 BucketlistRoutingModule,
//                 AppRoutingModule,
//                 HttpModule
//             ],
//             declarations: [
//                 BucketlistComponent,
//                 BucketlistItemComponent
//             ],
//             providers:[
//                 {provide: APP_BASE_HREF, useValue: '/my/app'},
//                 WebApiPathService,
//                 GenerateHeadersService,
//                 GetUserDetails,
//                 HandleErrorsService
//             ]
//         }).compileComponents();
//     }));

//     beforeEach(() => {
//         fixture = TestBed.createComponent(BucketlistItemComponent);
//         component = fixture.componentInstance;
//         fixture.detectChanges();
//     })

//     it('should be created', () => {
//         expect(component).toBeTruthy();
//     });

// });
