Tools for reverse engineering & debugging Firewalla with Frida.
If you don't know what frida is, or have to set it up checkout [Setting up frida](#setting-up-frida)

# Resources
If you want to contribute by reverse engineering more, checkout these helpful resources
- Reverse engineer APKs using [jadx](https://github.com/skylot/jadx)
- Debug firewalla using [frida](https://github.com/frida/frida)
- Official firewalla box [github](https://github.com/firewalla/firewalla)

# Logging HTTP requests from Firewalla
```bash
frida --codeshare helviojunior/okhttp-logging -U -f com.firewalla.chancellor
```
Type `%resume` in the frida console to start the app on your phone.
You should be able to see all HTTP requests & responses in the console

# Get ETP token
With the ETP token you can make requests to your firewalla box.
This token is valid for 5 years.
```bash
frida -l tools/app-frida-tools/etp-token-stealer.js -f com.firewalla.chancellor
```
Type `%resume` in the frida console, and you should be able to get the ETP_TOKEN in the console.

Do `CTRL+C` then type `exit` once the ETP_TOKEN has been printed out


# Setting up frida
[Frida](https://github.com/frida/frida) is a tool for dynamic analysis, debugging & reverse engineering.

## Requirements
Rooted android phone

## Install frida on host
```bash
pip install frida-tools
pip install frida
frida-ls-devices
```

## Install frida on android
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
```
7. If you are using magisk-hide on your phone
```bash
magiskhide disable
```

## Run the script
```
Make sure you have the firewalla app installed.
Then execute the frida script using
```bash
frida --codeshare helviojunior/okhttp-logging -U -f com.firewalla.chancellor
```
Type `%resume` in the frida console, and you should be able to get the ETP_TOKEN in the console.
Do `CTRL+C` then type `exit` once the ETP_TOKEN has been printed out
