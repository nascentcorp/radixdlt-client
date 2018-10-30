import Profiler from './profiler'
import {BehaviorSubject} from 'rxjs'
import {Response} from 'express'

class TransactionResponseHandler {
  public static async handle(res:Response, transactionStatus:BehaviorSubject<string>) {
    let buffer = [];
    const profiler = new Profiler()

    transactionStatus.subscribe({
      next: status => {
        buffer.push(status)
        profiler.log(status)
      },
      complete: () => {
        profiler.log('Transaction complete')
  
        let result = buffer.join('\n')
  
        console.log(result)
        res.json(buffer)
      },
      error: error => {
        console.error('Error submitting transaction', error)
        res.send(error)
      }
    })
  }
}

export default TransactionResponseHandler