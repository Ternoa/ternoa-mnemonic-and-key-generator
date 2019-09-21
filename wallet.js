//Import required Library
require('dotenv').config()

const pkutils = require('./index');
var bip39 = require('bip39')

const http = require('http');
const PORT = process.env.PORT || 5000;
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
//Get password from .env file
const password = process.env.PASSWORD;
//Int array
var walletDetails = [];

//generate mnemonic
const mnemonic = bip39.generateMnemonic();

//generate key
const privateKeyGen = pkutils.getPrivateKeyFromMnemonic(mnemonic);

//create keytore
const keystore = pkutils.getKeystoreFromPrivateKey(privateKeyGen, password);

//parse Key
const privateKeyParsed = pkutils.getPrivateKeyFromKeystore(keystore, password);

//account address
const account = keystore.address;

walletDetails.push(mnemonic);
walletDetails.push('0x'+ privateKeyParsed);
walletDetails.push('0x'+account);
walletDetails.push(keystore);

  res.end(JSON.stringify(walletDetails));
});

server.listen(PORT, () => {
  console.log(`Server running on ${PORT}/`);
});





