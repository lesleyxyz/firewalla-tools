import { Networker } from "./Networker.js"
import { AuthApi } from "./AuthApi.js"
import { SecureUtil } from '../utils/index.js'
import fetch from "node-fetch";
const sleep = ms => new Promise(r => setTimeout(r, ms))

class FWGroupApi extends AuthApi {
    _instance

    constructor(){
        if (FWGroupApi._instance) {
			return FWGroupApi._instance
		}
        super()
		FWGroupApi._instance = this

        let serverInstance = "v2"
        this.setApiNetworker(new Networker(`https://firewalla.encipher.io/app/api/${serverInstance}`))
    }

    async receiveMessageFromGroup(fwGroup){
        return this.getApiNetworker().authGetRelative(`/service/message/${fwGroup.aid}/${fwGroup.gid}/eptgroup/${fwGroup.eid}?count=100&peerId=${fwGroup.gid}&since=0`)
    }

    async startRendezVous(rendezVousId, license){
        return this.getApiNetworker().authPostRelative(`/ept/rendezvous/me`, {
          rid: rendezVousId,
          evalue: JSON.stringify({license})
        })
    }

    async joinGroup(qrcode, email){
        let firstTime = false; // where to get this?
        let prefix = firstTime ? "cybersecuritymadesimple" : qrcode.license.substring(0, 8);
        let aesKey = prefix + qrcode.seed
        let rid = SecureUtil.aesDecrypt(qrcode.ek, aesKey)
        await this.startRendezVous(rid, qrcode.license)
    
        let maxTries = 10;
        let currTry = 0;
        let newGroup = undefined;
    
        do {
            if(currTry >= maxTries){
                throw "Handshake failed, max tries exceeded";
            }
    
            await sleep(currTry == 0 ? 0 : 3000)
            let response = await this.login(email)
            newGroup = response.groups.filter(e => e._id == qrcode.gid)[0]
    
            currTry++;
        }while(!newGroup)
    }

    async login(email){
        let body = {
            assertion: {
                name: email,
                info: {name: "circle"},
                publicKey: SecureUtil.publicKey,
                appId: "com.rottiesoft.circle",
                appSecret: "fbb05afa-9145-41f1-8076-9de8be56f104",
                signature: ""
            }
        }
    
        let response = await fetch("https://firewalla.encipher.io/app/api/v2/login/eptoken", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }).then(r => r.json())
        
        this.setAuth(response.access_token)
        return response
    }

    async sendMessageBox(fwGroup, useLocal, fwMessage){
        let url = fwGroup.getMessageUrl(useLocal)
        let encryptionKey = fwGroup.getSymmetricKey()
        let messageString = JSON.stringify(fwMessage.toJSON(fwGroup.eid))
        let message = SecureUtil.aesEncrypt(messageString, encryptionKey)
    
        let response = await this.getApiNetworker().authPost(url, {
            timestamp: Math.floor(new Date() / 1000),
            message
        })
    
        if(response.error){
            throw response.error
        }
    
        return JSON.parse(SecureUtil.aesDecrypt(response.message, encryptionKey))
    }
}

export default new FWGroupApi()