import{ Observable } from "rxjs";

import { TestBucketlistPage } from "./test.data.spec";
import { ResponseModel } from '../models/response.model';

export class MockDeleteBucketlistService {
    response: ResponseModel = {
        message: "Bucketlist deleted",
        status: "success"
    }

    public deleteBucketlist(path: string, token: string): Observable<ResponseModel>{
        return Observable.of(this.response)
    }

}