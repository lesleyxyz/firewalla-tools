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
    let FWGroupManager = Java.use("com.firewalla.chancellor.managers.FWGroupManager");
    FWGroupManager.parseInitGroups.implementation = function(jSONObject){
        console.log('ETP_TOKEN FOUND')
        console.log(JSON.parse(jSONObject.toString()).access_token);
        return this.parseInitGroups(jSONObject);
    };
}