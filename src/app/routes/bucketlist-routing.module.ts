// External depencencies
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// Guards
import { CanActivateGuard } from '../guards/router.guard';

//Components
import { BucketlistComponent } from '../components/bucketlist/bucketlist.component';

@NgModule({
    imports: [RouterModule.forChild([
        {path: '', component:BucketlistComponent,
            children:[
                { path: '', redirectTo:'/bucketlist', pathMatch: 'full'},
                { path: 'bucketlist', component:BucketlistComponent }]
        }

    ])],
    exports: [RouterModule]
})

export class BucketlistRoutingModule {}