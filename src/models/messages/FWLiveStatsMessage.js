import { FWMessage } from "../FWMessage.js";


export class FWLiveStatsMessage extends FWMessage {
    constructor(){
        super("get", { item: "liveStats", value: {
            type: "system",
            target: "",
            queries: {
                throughput: {},
                activeConn: {}
            }
        }})
    }
}