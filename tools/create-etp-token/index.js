import {SecureUtil, FWPingMessage, FWGroup, FWGroupApi} from '../../src/index.js'

const email = ""
const pubKey = ""
const privKey = ""
const qr = {}
const localIp = ""

SecureUtil.importKeyPair(pubKey, privKey);

(async _ => {
	let response = await FWGroupApi.login(email)
	await FWGroupApi.joinGroup(qr, email)

	let fwGroup = FWGroup.fromJson(response.groups[0], localIp)
	let pingResult = await FWGroupApi.sendMessageBox(fwGroup, true, new FWPingMessage())

	if(pingResult.code == 200){
		console.log("Successfully linked to box! Your token:")
		console.log(response.access_token)
	}else{
		console.error("An error occured linking your ETP token to your box")
	}
})()
