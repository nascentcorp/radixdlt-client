"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const radixdlt_1 = require("radixdlt");
const app = express();
const port = 3000;
const ALPHANET = radixdlt_1.RadixUniverse.ALPHANET;
radixdlt_1.radixUniverse.bootstrap(ALPHANET);
const identityManager = new radixdlt_1.RadixIdentityManager();
this.myIdentity = identityManager.generateSimpleIdentity();
const myAccount = this.myIdentity.account;
myAccount.openNodeConnection();
console.log('My address: ', myAccount.getAddress());
app.get('/', (req, res) => res.send(`My address is ${myAccount.getAddress()}`));
app.get('/balance', (req, res) => res.send(myAccount.transferSystem.balance));
app.get('/transfers', (req, res) => res.send(myAccount.transferSystem.transactions));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
//# sourceMappingURL=server.js.map