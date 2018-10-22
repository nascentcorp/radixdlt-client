import Profiler from './profiler'
import {BehaviorSubject} from 'rxjs'
import {Response} from 'express'

class TransactionResponseHandler {
  public static handle(res:Response, transactionStatus:BehaviorSubject<string>): void {
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
        res.send(result)
      },
      error: error => {
        console.error('Error submitting transaction', error)
        res.send(error)
      }
    })
  }
}

export default TransactionResponseHandler