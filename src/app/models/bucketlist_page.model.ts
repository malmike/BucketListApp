import { BucketlistModel } from './bucketlist.model';

export class BucketlistPageModel{
    constructor(
        public next_page?: number,
        public total_data?: number,
        public per_page?: number,
        public data?: Array<BucketlistModel>,
        public pages?: number,
        public page?: number
    ){}
}