import fetch from "node-fetch";

export class Networker {
    baseUrl
    authToken

    constructor(baseUrl){
        this.baseUrl = baseUrl
    }

    setAuth(token){
        this.authToken = token
    }

    async authPostRelative(endpoint, body){
        return this.authPost(this.baseUrl + endpoint, body)
    }

    async authPost(url, body){
        return fetch(url, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${this.authToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }).then(r => r.json())
    }

    async authGetRelative(endpoint){
        return this.authGet(this.baseUrl + endpoint)
    }

    async authGet(url){
        return fetch(url, {
            headers: {
                "Authorization": `Bearer ${this.authToken}`,
            },
        }).then(r => r.json())
    }
}