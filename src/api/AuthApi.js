export class AuthApi {
    apiNetworker

    getApiNetworker(){
        return this.apiNetworker
	}

    setApiNetworker(apiNetworker){
        this.apiNetworker = apiNetworker
    }

    setAuth(token){
        this.getApiNetworker().setAuth(token)
    }
}