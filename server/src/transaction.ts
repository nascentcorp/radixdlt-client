import {RadixAccount, RadixSimpleIdentity, RadixTransactionBuilder} from 'radixdlt'

function sendTransaction(req:Request, res:Response, 
  identity:RadixSimpleIdentity,
  toAddress:string) {

  // No need to load data from the ledger for the recipient account
  const toAccount = RadixAccount.fromAddress(toAddress, true)
  const token = 'TEST' // The Radix TEST token
  const amount = 123.12

  const transactionStatus = RadixTransactionBuilder
    .createTransferAtom(identity.account, toAccount, token, amount)
    .signAndSubmit(identity)
                      
  transactionStatus.subscribe({
    next: status => {
      console.log(status) 
      // For a valid transaction, this will print, 'FINDING_NODE', 'GENERATING_POW', 'SIGNING', 'STORE', 'STORED'
    },
    complete: () => {console.log('Transaction complete')},
    error: error => {console.error('Error submitting transaction', error)}
  })
}

export default sendTransaction