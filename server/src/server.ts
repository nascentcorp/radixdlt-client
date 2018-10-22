import express from 'express'
import Runtime from './runtime'
import requestFunds from './faucet'
import sendMessage from './message'
//import sendPayload from './payload'

const app = express()
const port = 3000

Runtime.bootstrap()

app.get('/', (req, res) => res.send(`My address is ${Runtime.account.getAddress()}`))

app.get('/balance', (req, res) => res.send(Runtime.account.transferSystem.balance))

app.get('/transfers', (req, res) => res.send(Runtime.account.transferSystem.transactions))

app.get('/faucet', (req, res) => requestFunds(req, res, Runtime.identity))

app.get('/message', (req, res) => sendMessage(req, res, Runtime.identity))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))