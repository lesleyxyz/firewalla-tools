import fetch from "node-fetch"

/*export class FirewallaBoxInterface {
    name: string
    model: string
    gid: string
    eid: string
    status: boolean
    activeTs: Date
    syncTs: Date
    lokiEnabled: string
}*/

export class FirewallaBox {
    name
    model
    gid
    eid
    status
    activeTs
    syncTs
    lokiEnabled
    #headers

    constructor(box, bearer){
        this.name = box.name;
        this.model = box.model;
        this.gid = box.gid;
        this.eid = box.eid;
        this.status = box.status;
        this.activeTs = box.activeTs;
        this.syncTs = box.syncTs;
        this.lokiEnabled = box.lokiEnabled;

        this.#headers = {
            'x-firewalla-id': box.gid,
            authorization: `Bearer ${bearer}`,
        }
    }

    async _get(endpoint){
        return fetch(`https://my.firewalla.com${endpoint}`, { headers: this.#headers }).then(r => r.json())
    }

    async getDevices(){
        return this._get("/v1/device/list")
    }

    async getBoxInfo(){
        return this._get("/v1/box/info")
    }

    async getBoxSummaryInfo(){
        return this._get("/v1/dashboard/summaryInfo")
    }

    async getAlarms() {
        return this._get("/v1/alarm/info")
    }

    async getDeviceInfo(mac) {
        return this._get(`/v1/device/${mac}`)
    }

    async getRules(mac) {
        return this._get(`/v1/rule/list`)
    }

    async getDataUsage(){
        return this._get(`/v1/dashboard/dataUsage`)
    }
}