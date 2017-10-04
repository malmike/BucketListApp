import { UserModel } from '../models/user.model';
import { BucketlistModel } from '../models/bucketlist.model';
import { BucketlistItemModel } from '../models/bucketlist_item.model';
import { BucketlistPageModel } from '../models/bucketlist_page.model';


export const TestUser: UserModel = {
    fname: "John",
    lname: "Doe",
    email: "john@doe.com",
    password: "password"
}

export const bucketlist_item_1: BucketlistItemModel = {
    id: 55,
    name: "fvdvfds",
    date_created: "2017-09-28T10:13:52.890919",
    date_modified: "2017-09-28T10:13:52.891112",
    bucketlist_id: 68,
    completed: true,
    finished_by: "2017-09-30"
}

export const bucketlist_item_2: BucketlistItemModel = {
    id: 54,
    name: "vfvds",
    date_created: "2017-09-28T10:13:52.890919",
    date_modified: "2017-09-28T10:13:52.891112",
    bucketlist_id: 68,
    completed: false,
    finished_by: "2017-09-30"
}

export const bucketlist_item_3: BucketlistItemModel = {
    id: 48,
    name: "vfsvs",
    date_created: "2017-09-28T10:13:52.890919",
    date_modified: "2017-09-28T10:13:52.891112",
    bucketlist_id: 68,
    completed: false,
    finished_by: "2017-09-30"
}

export const bucketlist_item_4: BucketlistItemModel = {
    id: 49,
    name: "svdsa",
    date_created: "2017-09-28T10:13:52.890919",
    date_modified: "2017-09-28T10:13:52.891112",
    bucketlist_id: 68,
    completed: false,
    finished_by: "2017-09-30"
}

export const bucketlist_item_5: BucketlistItemModel = {
    id: 50,
    name: "fdsaf",
    date_created: "2017-09-28T10:13:52.890919",
    date_modified: "2017-09-28T10:13:52.891112",
    bucketlist_id: 66,
    completed: true,
    finished_by: "2017-09-30"
}

export const bucketlist_item_6: BucketlistItemModel = {
    id: 51,
    name: "vdasvd",
    date_created: "2017-09-28T10:13:52.890919",
    date_modified: "2017-09-28T10:13:52.891112",
    bucketlist_id: 66,
    completed: false,
    finished_by: "2017-09-30"
}

export const bucketlist_item_7: BucketlistItemModel = {
    id: 52,
    name: "mada",
    date_created: "2017-09-28T10:13:52.890919",
    date_modified: "2017-09-28T10:13:52.891112",
    bucketlist_id: 66,
    completed: false,
    finished_by: "2017-10-21"
}

export const bucketlist_item_8: BucketlistItemModel = {
    id: 43,
    name: "jvsf",
    date_created: "2017-09-21T07:35:53.609686",
    date_modified: "2017-09-21T07:35:53.609862",
    bucketlist_id: 55,
    completed: true,
    finished_by: "2017-09-30"
}

export const buckelist_1: BucketlistModel = {
    id: 68,
    name: "frwqvd",
    date_created: "2017-09-28T10:13:52.890919",
    date_modified: "2017-09-28T10:13:52.891100",
    created_by: 1,
    bucketlist_items: [
        bucketlist_item_1,
        bucketlist_item_2
    ]
}

export const bucketlist_2: BucketlistModel = {
    id: 62,
    name: "toimfds",
    date_created: "2017-09-28T10:13:52.890919",
    date_modified: "2017-09-28T10:13:52.891100",
    created_by: 1,
    bucketlist_items: [
        bucketlist_item_3,
        bucketlist_item_4
    ]
}

export const bucketlist_3: BucketlistModel = {
    id: 63,
    name: "asdva",
    date_created: "2017-09-28T10:13:52.890919",
    date_modified: "2017-09-28T10:13:52.891100",
    created_by: 1,
    bucketlist_items: [
        bucketlist_item_5,
        bucketlist_item_6
    ]
}

export const bucketlist_4: BucketlistModel = {
    id: 66,
    name: "asdfs",
    date_created: "2017-09-28T10:13:52.890919",
    date_modified: "2017-09-28T10:13:52.891100",
    created_by: 1,
    bucketlist_items: [
        bucketlist_item_7,
        bucketlist_item_8
    ]
}

export const bucketlist_5: BucketlistModel = {
    id: 67,
    name: "fdfdwq",
    date_created: "2017-09-28T10:13:52.890919",
    date_modified: "2017-09-28T10:13:52.891100",
    created_by: 1,
    bucketlist_items: []
}

export const bucketlist_6: BucketlistModel = {
    id: 55,
    name: "gghj",
    date_created: "2017-09-21T07:35:53.609686",
    date_modified: "2017-09-21T07:35:53.609850",
    created_by: 1,
    bucketlist_items: [

    ]
}

export const bucketlist_7: BucketlistModel = {
    id: 60,
    name: "gdh",
    date_created: "2017-09-21T07:35:53.609686",
    date_modified: "2017-09-21T07:35:53.609850",
    created_by: 1,
    bucketlist_items: []
}

export const bucketlist_8: BucketlistModel = {
    id: 61,
    name: "mgd",
    date_created: "2017-09-21T07:35:53.609686",
    date_modified: "2017-09-21T07:35:53.609850",
    created_by: 1,
    bucketlist_items: []
}

export const bucketlist_9: BucketlistModel = {
    id: 47,
    name: "ujbvvh",
    date_created: "2017-09-21T05:04:43.012924",
    date_modified: "2017-09-21T05:04:43.013109",
    created_by: 1,
    bucketlist_items: []
}


export const TestBucketlistPage: BucketlistPageModel = {
    page: 1,
    per_page: 5,
    total_data: 9,
    pages: 1,
    data: [
        buckelist_1,
        bucketlist_2,
        bucketlist_3,
        bucketlist_4,
        bucketlist_5
    ],
    prev_page: "/api/v1/bucketlist?limit=5",
    next_page: "/api/v1/bucketlist?limit=5&page=2"
}

export const TestBucketlistPage2: BucketlistPageModel = {
    page: 2,
    per_page: 5,
    total_data: 9,
    pages: 1,
    data: [
        bucketlist_6,
        bucketlist_7,
        bucketlist_8,
        bucketlist_9
    ],
    prev_page: "/api/v1/bucketlist?limit=5&page=1"
}


export const TestToken: string = "tests_token";

export const BucketlistDetails: string = "68";

