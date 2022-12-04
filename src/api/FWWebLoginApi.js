import { Networker } from "./Networker.js"
import { AuthApi } from "./AuthApi.js"

class FWWebLoginApi extends AuthApi {
    _instance

    constructor(){
        if (FWWebLoginApi._instance) {
			return FWWebLoginApi._instance
		}
        super()
		FWWebLoginApi._instance = this

        this.setApiNetworker(new Networker(`https://my.firewalla.com/`))
    }
}

export default new FWWebLoginApi()