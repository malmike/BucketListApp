// External modules and dependencies
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

// Routing modules
import { AppRoutingModule } from './routes/app-routing.module'

// Modules
import { AppAccessModule } from './modules/app-access.module';
import { BucketlistModule } from './modules/bucketlist.module';

// Components
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    AppAccessModule,
    BucketlistModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
