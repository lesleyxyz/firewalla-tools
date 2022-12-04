import { FWMessage } from "../FWMessage.js";


export class FWGetInternetSpeedtestResultsMessage extends FWMessage {

    /**
     * @param {Date} begin - Only return speedtests after this date
     */
    constructor(begin = 0){
        super("get", { item: "networkMonitorData", value: {
            begin: (begin / 1000)
        }})
    }
}