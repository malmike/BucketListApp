// External modules and dependencies
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
    BrowserModule,
    AppRoutingModule,
    AppAccessModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
