import fetch from "node-fetch";
import crypto from 'crypto';
import { exit } from "process";
import * as dotenv from 'dotenv'
dotenv.config()

const masterToken = process.env.ETP_TOKEN
if(!masterToken){
    console.log("Please set your master token as the ETP_TOKEN environment variable")
    exit(1)
}

const gid = process.env.FIREWALLA_GID
if(!gid){
    console.log("Please set your gid as the FIREWALLA_GID environment variable")
    exit(1)
}

async function authPost(relUrl, body){
  return fetch(`https://my.firewalla.com${relUrl}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${masterToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
  }).then(r => r.json())
}

async function createFireguardToken(){
  let token = crypto.randomUUID();
  let resp = await authPost(`/v1/auth/authorize/${token}?days=300`, [{ gid }])
  return resp.token
}

createFireguardToken().then(console.log)