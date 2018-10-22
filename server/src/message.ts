import Runtime from './runtime'
import Response from 'express'
import { RadixTransactionBuilder, RadixIdentity } from 'radixdlt'
import TransactionResponseHandler from './transactionResponseHandler'

function sendMessage(req:Request, res:Response, identity:RadixIdentity): void {

  req.json()
    .then((message) => {
      const transactionStatus = RadixTransactionBuilder
      .createRadixMessageAtom(identity.account, Runtime.testAccount, message)
      .signAndSubmit(identity)
                        
      TransactionResponseHandler.handle(res, transactionStatus)
    })
    .catch((err) => res.send(err))

}

export default sendMessage