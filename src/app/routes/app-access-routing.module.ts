// External modules and dependencies
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// Components
import { RegistrationComponent } from '../components/app-access/registration/registration.component';

@NgModule({
  imports: [RouterModule.forChild([
      { path: 'registration', component: RegistrationComponent}
  ])],
  exports: [RouterModule]
})

export class AppAccessRoutingModule {}

