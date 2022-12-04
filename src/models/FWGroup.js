import SecureUtil from '../utils/SecureUtil.js'

export class FWGroup {
	symmetricKeyPlain

	/**
     * @param {string} gid - Group ID
     * @param {string} eid - ETP ID, I think?
     * @param {string} aid - ?? unknown
     * @param {string} symmetricKeyCipher - The symmetric key for communication, encrypted using the public key of the ETP token
     * @param {string} localIp - The local IP of the FWGroup 
     */
	constructor(gid, eid, aid, symmetricKeyCipher, name, localIp){
		this.gid = gid;
		this.eid = eid;
		this.aid = aid;
		this.name = name;
		this.localIp = localIp;
		this.symmetricKeyCipher = symmetricKeyCipher;
	}

	/**
     * @param {string} obj - The JSON from the ETP API refering to a FWGroup
     * @param {string} localIp - The local IP of the FWGroup 
     */
	static fromJson(obj, localIp){
		let {_id, eid, aid, symmetricKeys, name} = obj;
		return new FWGroup(_id, eid, aid, symmetricKeys[0].key, name, localIp);
	}

	getSymmetricKey() {
		if(!this.symmetricKeyPlain){
			this.symmetricKeyPlain = SecureUtil.rsaDecrypt(this.symmetricKeyCipher)
		}

		return this.symmetricKeyPlain;
	}

	/**
     * @param {boolean} useLocal - Whether to use the local internal API (true, only reachable if you are on the same local network) or the public API (false, reachable from any IP)
     */
    getMessageUrl(useLocal){
        if(useLocal){
            return `http://${this.localIp}:8833/v1/encipher/message/${this.gid}`
        }else{
            return `https://firewalla.encipher.io/app/api/v2/service/message/${this.aid}/${this.gid}/eptgroup/${this.gid}`
        }
    }
}
