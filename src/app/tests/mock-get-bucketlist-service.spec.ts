import { Observable } from "rxjs";
import { buckelist_1 } from "./test.data.spec";
import { BucketlistModel } from '../models/bucketlist.model';
import { ResponseModel } from '../models/response.model';

export class MockGetBucketlistService {

    bucketlist: BucketlistModel = new BucketlistModel();
    response: ResponseModel = {
        message: "Bucketlists item retrieved",
        status: "success"
    }

    getBucketlist(path: string, token: string): Observable<ResponseModel>{
        this.bucketlist = buckelist_1;
        return Observable.of(this.response)
    }

    getSingleBucketlist(): BucketlistModel{
        return this.bucketlist;
    }
}