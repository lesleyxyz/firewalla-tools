import { FWMessage } from "../FWMessage.js";


export class FWEnableFeatureMessage extends FWMessage {
    /**
     * @param {string} featureName - Which feature to enable (adblock, family_protect, safe_search, unbound, ...)
     */
    constructor(featureName){
        super("cmd", { item: "enableFeature", value: { featureName }})
    }
}