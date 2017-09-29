import{ Observable } from "rxjs";

import { TestBucketlistPage } from "./test.data";
import { BucketlistPageModel } from '../models/bucketlist_page.model';
import { ResponseModel } from '../models/response.model';

export class MockGetBucketlistsService {
    bucketlist_page: BucketlistPageModel = new BucketlistPageModel();
    response: ResponseModel = {
        message: "Bucketlists retrieved",
        status: "success"
    }

    public getBucketlists(path: string, token: string): Observable<ResponseModel>{
        this.bucketlist_page = TestBucketlistPage;
        return Observable.of(this.response)
    }

    public getBucketlistPage(): BucketlistPageModel {
        return this.bucketlist_page;
    }
}