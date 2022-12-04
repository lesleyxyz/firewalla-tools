import FirewallaConnector from "./FirewallaConnector.js"
import { exit } from "process";
import * as dotenv from 'dotenv'
dotenv.config()

const authorizationToken = process.env.FIREGUARD_TOKEN
if(!authorizationToken){
    console.log("Please set your fireguard token as the FIREGUARD_TOKEN environment variable")
    exit(1)
}

const gid = process.env.FIREWALLA_GID
if(!gid){
    console.log("Please set your gid as the FIREWALLA_GID environment variable")
    exit(1)
}

let connector = new FirewallaConnector(authorizationToken)
let box = await connector.getBoxById(gid)

console.log(await box.getBoxInfo())
console.log(await box.getDevices())
