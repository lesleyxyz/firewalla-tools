import { FWMessage } from "../FWMessage.js";


export class FWPingMessage extends FWMessage {
    constructor(){
        super("cmd", { item: "ping" })
    }
}