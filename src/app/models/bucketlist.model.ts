import { BucketlistItemModel } from './bucketlist_item.model';
export class BucketlistModel{
    constructor(
        public id?: number,
        public date_created?: string,
        public bucketlist_items?: Array<BucketlistItemModel>,
        public name?: string,
        public created_by?: number,
        public date_modified?: string
    ){}
}