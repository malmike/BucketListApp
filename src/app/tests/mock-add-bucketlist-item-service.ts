import{ Observable } from "rxjs";

import { TestBucketlistPage } from "./test.data";
import { BucketlistItemModel } from '../models/bucketlist_item.model';
import { ResponseModel } from '../models/response.model';

export class MockAddBucketlistItemService {
    response: ResponseModel = {
        message: "Bucketlist list item added",
        status: "success"
    }

    public addBucketlistItem(bucketlistitem: BucketlistItemModel, path: string, token: string): Observable<ResponseModel>{
        return Observable.of(this.response)
    }

}