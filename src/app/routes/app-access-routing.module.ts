// External modules and dependencies
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// Guards
import { LogoutGuard } from '../guards/router.guard';

// Components
import { LoginComponent } from '../components/app-access/login/login.component';
import { RegistrationComponent } from '../components/app-access/registration/registration.component';

@NgModule({
  imports: [RouterModule.forChild([
      { path: 'login', component: LoginComponent, canActivate:[LogoutGuard] },
      { path: 'registration', component: RegistrationComponent, canActivate:[LogoutGuard]  }
  ])],
  exports: [RouterModule]
})

export class AppAccessRoutingModule {}

