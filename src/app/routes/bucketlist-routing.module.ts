// External depencencies
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// Guards
import { CanActivateGuard } from '../guards/router.guard';

//Components
import { BucketlistComponent } from '../components/bucketlist/bucketlist.component';
import { BucketlistPageComponent } from '../components/bucketlist-page/bucketlist-page.component';
import { BucketlistItemComponent } from '../components/bucketlist-item/bucketlist-item.component';


@NgModule({
    imports: [RouterModule.forChild([
        {path: '', component:BucketlistComponent, canActivate:[CanActivateGuard],
            children:[
                { path: '', redirectTo:'/bucketlist', pathMatch: 'full'},
                { path: 'bucketlist', component: BucketlistPageComponent },
                { path: 'bucketlistitem', component:BucketlistItemComponent}
            ]
        }

    ])],
    exports: [RouterModule]
})

export class BucketlistRoutingModule {}