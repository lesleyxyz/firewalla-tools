import { FWMessage } from "../FWMessage.js";


export class FWGetLast12MonthlyDateUsageMessage extends FWMessage {

    /**
     * @param {Date} acl - ?? unknown parameter
     */
    constructor(acl = true){
        super("get", { item: "last12monthlyDataUsage", value: { acl }})
    }
}