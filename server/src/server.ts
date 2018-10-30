import express = require('express')
import {Response} from 'express'
import Runtime from './runtime'
import requestFunds from './faucet'
import sendMessage from './message'
import { RadixIdentity } from 'radixdlt';
//import sendPayload from './payload'

const app = express()
const port = 3000

Runtime.bootstrap()

console.log('watching and all is well')

app.get('/', (req, res) => res.send(`My address is ${Runtime.account.getAddress()}`))

app.get('/balance', (req, res) => res.send(Runtime.account.transferSystem.balance))

app.get('/transfers', (res:Response) => res.send(Runtime.account.transferSystem.transactions))

app.get('/faucet', async (req, res) => await requestFunds(req, res, Runtime.identity))

app.post('/message', (req, res) => sendMessage(req, res, Runtime.identity))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

export default app