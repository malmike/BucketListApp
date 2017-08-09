// External modules and dependencies
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import 'hammerjs';

// Routing modules
import { AppRoutingModule } from './routes/app-routing.module'

// Modules
import { AppAccessModule } from './modules/app-access.module';

// Components
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    AppAccessModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
