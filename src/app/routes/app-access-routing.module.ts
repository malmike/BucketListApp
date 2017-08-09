// External modules and dependencies
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// Components
import { LoginComponent } from '../components/app-access/login/login.component';
import { RegistrationComponent } from '../components/app-access/registration/registration.component';

@NgModule({
  imports: [RouterModule.forChild([
      { path: 'login', component: LoginComponent },
      { path: 'registration', component: RegistrationComponent }
  ])],
  exports: [RouterModule]
})

export class AppAccessRoutingModule {}

