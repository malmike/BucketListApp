import { UserModel } from './user.model';
export class CurrentUserModel{
    constructor(
        public token?: string,
        public user?: UserModel
    ){}
}