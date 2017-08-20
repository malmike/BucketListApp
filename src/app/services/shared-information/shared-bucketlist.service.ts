import { Injectable } from '@angular/core';
import { BucketlistModel } from '../../models/bucketlist.model';

@Injectable()
export class SharedBucketlistService{
    private single_bucketlist: BucketlistModel;

    set bucketlist_item(single_bucketlist: BucketlistModel){
        this.single_bucketlist = single_bucketlist;
    }

    get bucketlist_item(): BucketlistModel{
        return this.single_bucketlist;
    }

}