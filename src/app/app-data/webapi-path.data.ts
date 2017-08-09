import { WebApiPathModel } from '../models/webapi-path.model';

export const WebApiPathList:Array<WebApiPathModel> = [
    {name: 'registration', path: 'api/v1/auth/register'},
    {name: 'login', path: 'api/v1/auth/login'},
    {name: 'bucketlist', path: 'api/v1/bucketlist'}
]