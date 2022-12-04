import { FWMessage } from "../FWMessage.js";


export class FWInitMessage extends FWMessage {
    /**
     * @param {string} target - ?? unknown parameter
     */
    constructor(target = "0.0.0.0"){
        super("init", { get: target })
    }
}