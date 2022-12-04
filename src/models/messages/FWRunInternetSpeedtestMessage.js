import { FWMessage } from "../FWMessage.js";


export class FWRunInternetSpeedtestMessage extends FWMessage {
    /**
     * @param {string} wanUUID - the UUID of the WAN interface to run the speedtest on
     * @param {string} serverId - the ID of the remote server to run the speedtest on
     * @param {boolean} noUpload - whether to skip upload for the speedtest
     * @param {boolean} noDownload - whether to skip download for the speedtest
     */
    constructor(wanUUID = "", serverId = "", noUpload = false, noDownload = false){
        super("cmd", { item: "runInternetSpeedtest", value: {
            wanUUID, serverId, noUpload, noDownload
        }})
    }
}