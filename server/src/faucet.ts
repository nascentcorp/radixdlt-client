import {RadixAccount, RadixSimpleIdentity, RadixTransactionBuilder, RadixUniverse} from 'radixdlt'
import {Request, Response} from 'express'
import Profiler from './profiler'
import TransactionResponseHandler from './transactionResponseHandler'
import Runtime from "./runtime"

async function requestFunds(req:Request, res:Response, identity:RadixSimpleIdentity) {
  // const account = identity.account
  // console.log('My address: ', account.getAddress())
  // account.transferSystem.transactionSubject.subscribe(console.log)

  //await account.openNodeConnection()

  const faucetAccount = RadixAccount.fromAddress('9he94tVfQGAVr4xoUpG3uJfB2exURExzFV6E7dq4bxUWRbM5Edd', true)
  const message = 'Dear Faucet, may I please have some moeny? (◕ᴥ◕)'

  const profiler = new Profiler()


  const transactionStatus = RadixTransactionBuilder
    .createRadixMessageAtom(Runtime.account, faucetAccount, message)
    .signAndSubmit(identity)
    
  TransactionResponseHandler.handle(res, transactionStatus)
}

export default requestFunds