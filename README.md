# Firewalla tools

Code to access the firewalla API & tools for reverse engineering Firewalla
If you want to use the firewalla API in your node project, checkout [node-firewalla](https://github.com/lesleyxyz/node-firewalla/)

If you like my work, give this reposiitory a `⭐` or [Buy Me A Coffee ☕](https://www.buymeacoffee.com/lesleyxyz)

# Definitions
**My Firewalla API**: https://my.firewalla.com A user friendly way to access your firewalla box through the browser

**Internal Box API**: An API inside your firewalla box, accessable both through a public endpoint (https://firewalla.encipher.io) and a local endpoint (http://{box_ip}:8833). This API is used mostly in the app. 

**Fireguard token**: A type of authorization token to access the My Firewalla API

**ETP token**: A type of authorization token to access the internal API of your box. This token is linked to an email and public/private keypair

# Tools in this repository
## create-etp-token
```bash
npm install
node create-etp-token
```
Create an ETP token by adding an additional device

This is the recommended way of getting a token to access an API.

## create-fireguard-token
```bash
npm install
node create-fireguard-token
```
Create a fireguard token from an ETP token, valid for 300 days.

In the app, firewalla creates a fireguard token using the qr code of the My Firewalla API
This token is usually valid for only 3 hours.

You can use this tool if you only want a token to access the My Firewalla API

## app-frida-tools
Documentation & tools to reverse engineer the Firewalla app.
