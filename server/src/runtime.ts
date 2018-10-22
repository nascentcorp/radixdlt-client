import {RadixAccount, RadixIdentityManager, RadixSimpleIdentity, radixUniverse, RadixUniverse} from 'radixdlt'

class Runtime {

  private static _identity:RadixSimpleIdentity
  public static get identity():RadixSimpleIdentity {
    return this._identity
  }

  private static _account:RadixAccount
  public static get account():RadixAccount {
    return this._account
  }

  private static _testAccount:RadixAccount
  public static get testAccount():RadixAccount {
    return this._testAccount
  }

  static async bootstrap(config:any = null) {
    if(!config) {
      const ALPHANET = RadixUniverse.ALPHANET
      radixUniverse.bootstrap(ALPHANET)
    }
    else {
      const netConfig = config
      radixUniverse.bootstrap(netConfig)
    }
    const identityManager = new RadixIdentityManager()

    this._identity = identityManager.generateSimpleIdentity()

    this._account = this._identity.account
    await this._account.openNodeConnection()

    this._testAccount = RadixAccount.fromAddress('9i9hgAyBQuKvkw7Tg5FEbML59gDmtiwbJwAjBgq5mAU4iaA1ykM')
  }

// Subscribe for any new incoming transactions
// publicTestAccount.transferSystem.transactionSubject.subscribe(transactionUpdate => {
//   console.log(transactionUpdate)
// })

// // Subscribe for all previous transactions as well as new ones
// publicTestAccount.transferSystem.getAllTransactions().subscribe(transactionUpdate => {
//   console.log(transactionUpdate)
// })

}

export default Runtime