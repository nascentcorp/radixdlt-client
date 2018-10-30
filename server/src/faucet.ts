import {RadixAccount, RadixSimpleIdentity, RadixTransactionBuilder, RadixUniverse} from 'radixdlt'
import {Request, Response} from 'express'
import TransactionResponseHandler from './transactionResponseHandler'
import Runtime from "./runtime"

async function requestFunds(req:Request, res:Response, identity:RadixSimpleIdentity) {
  const faucetAccount = RadixAccount.fromAddress('9he94tVfQGAVr4xoUpG3uJfB2exURExzFV6E7dq4bxUWRbM5Edd', true)
  const message = 'Dear Faucet, may I please have some moeny? (◕ᴥ◕)'

  const transactionStatus = RadixTransactionBuilder
    .createRadixMessageAtom(Runtime.account, faucetAccount, message)
    .signAndSubmit(identity)
    
  return await TransactionResponseHandler.handle(res, transactionStatus)
}

export default requestFunds