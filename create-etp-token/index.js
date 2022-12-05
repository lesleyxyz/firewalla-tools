import { SecureUtil, FWPingMessage, FWGroup, FWGroupApi } from 'node-firewalla'
import validator from 'validator';
import inquirer from 'inquirer';
import fs from 'fs';
import { exit } from 'process';


(async _ => {
	let {email, qr, localIp, createNewKeyPair} = await promptQuestions()

	if(!createNewKeyPair){
		let {publicKey, privateKey} = await promptKeyPair()
		SecureUtil.importKeyPair(publicKey, privateKey)
	}else{
		SecureUtil.regenerateKeyPair()
		writeKeyPair()
	}

	let response = await FWGroupApi.login(email)
	await FWGroupApi.joinGroup(JSON.parse(qr), email)

	let fwGroup = FWGroup.fromJson(response.groups[0], localIp)

	try {
		await FWGroupApi.sendMessageToBox(fwGroup, new FWPingMessage(), true)
		console.log("Successfully linked to box! Your token:")
		console.log(response.access_token)
	}catch(err){
		console.error("An error occured linking your ETP token to your box", err)
	}
})()


function writeKeyPair(){
	if(fs.existsSync("etp.private.pem")){
		console.log("etp.private.pem already exists. Rename or move this file")
		exit(1)
	}
	if(fs.existsSync("etp.public.pem")){
		console.log("etp.public.pem already exists. Rename or move this file")
		exit(1)
	}
	
	console.log("ETP Private Key written to etp.private.pem")
	fs.writeFileSync("etp.private.pem", SecureUtil.privateKey)
	console.log("ETP Public Key written to etp.public.pem")
	fs.writeFileSync("etp.public.pem", SecureUtil.publicKey)
}

async function promptQuestions(){
	let questions = [
		{
			type: 'input',
			name: 'email',
			message: "Email for ETP Token?",
			validate: email => !validator.isEmail(email) ? "Invalid email" : true
		},
		{
			type: 'input',
			name: 'qr',
			message: "Firewalla QR code (json format)?",
			validate: validateQrCode,
		},
		{
			type: 'input',
			name: 'localIp',
			default: '192.168.1.1',
			message: "Firewalla box IP address?",
			validate: ip => !validator.isIP(ip) ? "Invalid IP": true,
		},
		{
			type: 'confirm',
			name: 'createNewKeyPair',
			default: 'Y',
			message: "Create new key pair?",
		},
	]

	return inquirer.prompt(questions)
}

async function promptKeyPair(){
	let questions = [
		{
			type: 'input',
			name: 'pubKeyFile',
			default: 'etp.public.pem',
			message: "Public key file?",
			validate: file => !fs.existsSync(file) ? "File not found" : true
		},
		{
			type: 'input',
			name: 'privKeyFile',
			default: 'etp.private.pem',
			message: "Private key file?",
			validate: file => !fs.existsSync(file) ? "File not found" : true
		},
	]

	let {pubKeyFile, privKeyFile} = await inquirer.prompt(questions)

	return {
		publicKey: fs.readFileSync(pubKeyFile, {encoding: "utf8"}),
		privateKey: fs.readFileSync(privKeyFile, {encoding: "utf8"})
	}
}


function validateQrCode(qr) {
	try{
		qr = JSON.parse(qr.trim())
	}catch(err){
		return "QR code is not valid json"
	}

	let requiredFields = ["gid", "seed", "license", "ek", "ipaddress"]
	for(let field of requiredFields){
		if(!(field in qr)){
			return `Field ${field} not in the QR code JSON`
		}
	}

	return true
}