import { FWMessage } from "../FWMessage.js";


export class FWGetMonthlyDataUsageMessage extends FWMessage {
    constructor(){
        super("get", { item: "monthlyDataUsage", value: {} })
    }
}