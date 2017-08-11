export class GlobalVariables {
    private static instance: GlobalVariables;
    private webApi:string = "http://localhost:5000/";
    private token_header:string = "x-access-token";
    private store_user:string = "current_user";
    private loginUrl: string = this.webApi + "api/v1/auth/login";
    private constructor() {}
    static getInstance() {
        if (!GlobalVariables.instance) {
            GlobalVariables.instance = new GlobalVariables();
        }
        return GlobalVariables.instance;
    }
    getWebApi():string {
        return this.webApi;
    }
    getTokenHeader():string {
        return this.token_header;
    }
    getLoginUrl():string {
        return this.loginUrl;
    }
    getStoreUser():string {
        return this.store_user;
    }
}