import Runtime from './runtime'
import {Request, Response} from 'express'
import { RadixTransactionBuilder, RadixIdentity } from 'radixdlt'
import TransactionResponseHandler from './transactionResponseHandler'

async function sendMessage(req:Request, res:Response, identity:RadixIdentity) {
    console.log('Sending message: ' + req.body)
    
    const transactionStatus = RadixTransactionBuilder
    .createRadixMessageAtom(identity.account, Runtime.testAccount, req.body)
    .signAndSubmit(identity)
                      
    return await TransactionResponseHandler.handle(res, transactionStatus)

}

export default sendMessage