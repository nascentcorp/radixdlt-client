export class Profiler {
  constructor(public startTime:Date = new Date()) {

  }

  public log(message:string):void {
    let nextTime = new Date()
    if(message)
      console.log(message)

    console.log(`Operation completed in ${nextTime.getTime() - this.startTime.getTime()} ms.`)

    this.startTime = nextTime
  }
}

export default Profiler