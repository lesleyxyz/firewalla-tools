import fetch from "node-fetch"
import { FirewallaBox } from "./FirewallaBox.js";

export default class FirewallaConnector {
    #bearer

    constructor(bearer){
        this.#bearer = bearer;
    }

    async getBoxes() {
        let boxes = await fetch("https://my.firewalla.com/v1/box/list", {
            headers: { authorization: `Bearer ${this.#bearer}` }
        }).then(r => r.json())

        return boxes.map(box => new FirewallaBox(box, this.#bearer))
    }

    async getBoxById(gid){
        let boxes = await this.getBoxes()
        return boxes.filter(b => b.gid == gid)[0]
    }
}