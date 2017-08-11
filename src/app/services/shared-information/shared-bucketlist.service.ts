import { Injectable } from '@angular/core';
import { BucketlistModel } from '../../models/bucketlist.model';

@Injectable()
export class SharedBucketlistService{
    private bucketlist: BucketlistModel = new BucketlistModel();
    setBucketlist(bucketlist: BucketlistModel): void{
        this.bucketlist = bucketlist;
    }

    getBucketlist(): BucketlistModel{
        return this.bucketlist;
    }
}