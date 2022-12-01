Code to access the firewalla API & tools for reverse engineering Firewalla

Better documentation & steps coming later.


# Files
## src/
Files to start using the firewalla API

## tools/firewalla-frida.js
[Frida](https://github.com/frida/frida) script to get the master token.
This token is required to generate a fireguard token
### Requirements
Rooted android phone

### Install frida on host
```bash
pip install frida-tools
pip install frida
frida-ls-devices
```

### Install frida on android
1. Get your phone cpu architecture
```bash
adb shell getprop ro.product.cpu.abi
```
2. Download the correct frida-server-xx.x.x-android-xxx.xz file from [here](https://github.com/frida/frida/releases)
3. Extract the .xz and rename the file to `frida-server`
4. Push the binary to your phone & enter adb shell
```bash
adb push frida-server /data/local/tmp
adb shell
```
5. On your phone's shell execute
```bash
su
cd /data/local/tmp
chmod +x frida-server
./frida-server
```
6. If you get the error: VM::AttachCurrentThread failed: -1:
```bash
setprop persist.device_config.runtime_native.usap_pool_enabled false
./frida-server
```bash
7. If you are using magiskhide on your phone
```
magiskhide disable
```

### Run the script
Get your device ID using
```bash
adb devices
```
Make sure you have the firewalla app installed.
Then execute the frida script using
```bash
frida -D <device_id> -l tools/firewalla-frida.js -f com.firewalla.chancellor
```
Type `%resume` in the frida console, and you should be able to get the MASTER_TOKEN from an Authorization Bearer header.

## tools/create-token.js
This scripts create a fireguard token valid for 300 days.
Requires environment variables (.env):
- FIREWALLA_GID: The UUID of your Firewalla box, found in the App -> Settings -> About -> GID
- MASTER_TOKEN: Obtained using `tools/firewalla-frida.js`