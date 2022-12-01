const sleep = ms => new Promise(r => setTimeout(r, ms))
const baseClass = "com.firewalla.chancellor.api.Networker"

async function setup() {
    await findClassLoader();
    await start()
}
setup()

async function findClassLoader(){
    console.log("Finding class loader")

    let found = false
    while(!found){
        await sleep(200)
        const classLoaders = Java.enumerateClassLoadersSync()
        for (const classLoader of classLoaders) {
            try {
                classLoader.findClass(baseClass);
                Java.classFactory.loader = classLoader;
                found = true
                break;
            } catch {
                continue;
            }
        }
    }

    console.log("Found!")
}

function start(){
    let Networker = Java.use("com.firewalla.chancellor.api.Networker");
    Networker.authPostRelativeAsync.implementation = function(url, body, j, continuation){
        console.log('authPostRelativeAsync', url, body, j);
        
        let ret = this.authPostRelativeAsync(url, body, j, continuation);
        console.log('authPostRelativeAsync ret', ret);

        return ret;
    };

    Networker.setAuth.implementation == function(name, password){
        console.log("setAuth", name, password)
        return this.setAuth(name, password)
    }

    let AuthApi = Java.use("com.firewalla.chancellor.api.AuthApi");
    AuthApi.setAuth.implementation == function(name, password){
        console.log("setAuth", name, password)
        return this.setAuth(name, password)
    }

    let FWGroupManager = Java.use("com.firewalla.chancellor.managers.FWGroupManager");
    FWGroupManager.parseInitGroups.implementation = function(jSONObject){
        console.log('parseInitGroups is called', jSONObject, JSON.stringify(jSONObject));
        let ret = this.parseInitGroups(jSONObject);
        console.log('parseInitGroups ret value is ' + ret);
        return ret;
    };
}