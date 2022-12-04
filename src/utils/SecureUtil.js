import crypto from 'crypto';

class SecureUtil {
	_instance
	privateKey
	publicKey

	constructor(){
		if (SecureUtil._instance) {
			return SecureUtil._instance
		}
		SecureUtil._instance = this
	}

	regenerateKeyPair(){
		const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
			modulusLength: 2048,
			publicKeyEncoding: {
				type: 'spki',
				format: 'pem'
			},
			privateKeyEncoding: {
				type: 'pkcs8',
				format: 'pem'
			}
		});

		this.importKeyPair(publicKey, privateKey)
	}

	importKeyPair(publicKey, privateKey){
		this.publicKey = publicKey
		this.privateKey = privateKey
	}

	rsaDecrypt(cipherBase64){
		const buffer = Buffer.from(cipherBase64, 'base64')
		return crypto.privateDecrypt(this.privateKey, buffer).toString('utf8')
	}

	aesDecrypt(msg, key) {
		try {
			let iv = Buffer.alloc(16);
			iv.fill(0);
			let bkey = Buffer.from(key.substring(0, 32), "utf8");
			let decipher = crypto.createDecipheriv('aes-256-cbc', bkey, iv);
			let plain = decipher.update(msg, 'base64', 'utf8');
			return plain + decipher.final('utf8');
		} catch(err) {
			console.error("Failed to decrypt message", err);
			return null;
		}
	}
	
	aesEncrypt(msg, key) {
		try {
			let iv = Buffer.alloc(16);
			iv.fill(0);
			let bkey = Buffer.from(key.substring(0, 32), "utf8");
			let cipher = crypto.createCipheriv('aes-256-cbc', bkey, iv);
			let encrypted = cipher.update(msg, 'utf8', 'base64');
			return encrypted += cipher.final('base64');
		} catch(err) {
			console.error("Failed to encrypted message", err);
			return null;
		}
	}
}

export default new SecureUtil()