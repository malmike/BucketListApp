// External depencencies
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// Guards
import { CanActivateGuard } from '../guards/router.guard'

@NgModule({
  imports: [RouterModule.forChild([

  ])],
  exports: [RouterModule]
})

export class BucketlistRoutingModule {}