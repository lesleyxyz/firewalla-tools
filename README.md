# Firewalla tools

Code to access the firewalla API & tools for reverse engineering Firewalla
If you want to use the firewalla API in your node project, checkout [node-firewalla](https://github.com/lesleyxyz/node-firewalla/)

If you like my work, give this repository a `⭐` or consider [Buying Me A Coffee ☕](https://www.buymeacoffee.com/lesleydk)

# Definitions
**My Firewalla API**: https://my.firewalla.com A user friendly way to access your firewalla box through the browser

**Internal Box API**: An API inside your firewalla box, accessable both through a public endpoint (https://firewalla.encipher.io) and a local endpoint (http://{box_ip}:8833). This API is used mostly in the app. 

**Fireguard token**: A type of authorization token to access the My Firewalla API

**ETP token**: A type of authorization token to access the internal API of your box. This token is linked to an email and public/private keypair

# Tools in this repository
## create-etp-token
```bash
node create-etp-token
```
Create an ETP token by adding an additional device
This is the recommended way of getting a token to access an API.

### How to use
1) Install the required modules using `npm install`.
2) Make sure you are on the same network as your firewalla & find out its IP
3) `node create-etp-token`
4) Input an email to create your ETP token. Your email will only be used to display in the app.
5) Go to Your Firewalla App -> Select your box -> Settings -> Advanced -> Allow Additional Pairing -> Turn on Additional Pairing
6) Scan or screenshot the QR code and find copy its JSON value. Then input it in the program
7) Enter the IP address of your box
8) Create a new key pair: Yes (or no if you want to generate or reuse your own)
9) Done! Now you will only need the `etp.private.pem` & `etp.public.pem` files to use with [node-firewalla](https://github.com/lesleyxyz/node-firewalla)
10) An ETP_TOKEN will also be printed out if you want to use it with `create-fireguard-token`

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
