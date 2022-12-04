import { FWMessage } from "../FWMessage.js";


export class FWGetNetworkMonitorDataMessage extends FWMessage {
    constructor(){
        super("get", { item: "networkMonitorData", value: {} })
    }
}