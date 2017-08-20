export class BucketlistModel{
    constructor(
        public id?: number,
        public date_created?: string,
        public name?: string,
        public created_by?: number,
        public date_modified?: string
    ){}
}