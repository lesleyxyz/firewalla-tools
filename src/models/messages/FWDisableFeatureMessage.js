import { FWMessage } from "../FWMessage.js";


export class FWDisableFeatureMessage extends FWMessage {
    /**
     * @param {string} featureName - Which feature to disable (adblock, family_protect, safe_search, unbound, ...)
     */
    constructor(featureName){
        super("cmd", { item: "disableFeature", value: { featureName }})
    }
}