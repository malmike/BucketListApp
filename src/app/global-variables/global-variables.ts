export class GlobalVariables {
    private static instance: GlobalVariables;
    private webApi:string = "http://localhost:5000/api/v1/";
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
}