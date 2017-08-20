export class BucketlistItemModel{
    constructor(
        public id?: number,
        public date_created?: string,
        public finished_by?: string,
        public completed?: boolean,
        public name?: string,
        public bucketlist_id?: number,
        public date_modified?: string
    ){}
}