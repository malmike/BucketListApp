// External dependencies
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
      {path: '', redirectTo: '/login', pathMatch: 'full'},
      {path: 'login', redirectTo: '/login', pathMatch: 'full'},
      {path: 'registration', redirectTo: '/registration', pathMatch: 'full'},
      {path: 'nav', loadChildren: 'app/modules/bucketlist.module#BucketlistModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}