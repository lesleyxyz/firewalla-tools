import crypto from 'crypto';


export class FWMessage {
    /**
     * @param {string} type - message type (cmd, init, set, get)
     * @param {object} data - the payload of the message
     * @param {string} target - ?? unknown parameter
     */
    constructor(type, data, target = "0.0.0.0"){
        this.type = type
        this.data = data
        this.target = target
        this.uuid = crypto.randomUUID()
    }

    toJSON(eid){
        return {
            mtype: "msg",
            message: {
                mtype: "msg",
                type: "jsondata",
                msg: "",
                from: "NodeJS",
                obj: {
                    type: "jsonmsg",
                    id: this.uuid,
                    mtype: this.type,
                    target: this.target,
                    data: this.data
                },
                appInfo: {
                    deviceName: "NodeJS",
                    appID: "com.rottiesoft.circle",
                    platform: process.platform,
                    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                    language: "en",
                    version: "1.51.84",
                    eid
                },
                compressMode: 1
            }
        }
    }
}
