// External depencencies
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// Guards
import { CanActivateGuard } from '../guards/router.guard';

//Components
import { BucketlistComponent } from '../components/bucketlist/bucketlist.component';
import { BucketlistPageComponent } from '../components/bucketlist-page/bucketlist-page.component';


@NgModule({
    imports: [RouterModule.forChild([
        {path: '', component:BucketlistComponent, canActivate:[CanActivateGuard],
            children:[
                { path: '', redirectTo:'/bucketlist', pathMatch: 'full'},
                { path: 'bucketlist', component: BucketlistPageComponent }]
        }

    ])],
    exports: [RouterModule]
})

export class BucketlistRoutingModule {}