import {
  Repository,
  getRepository,
  DeleteResult,
  createQueryBuilder,
  createConnection
} from "typeorm";
import Account from "../../entities/AccountModel";
import {
  IManager
} from "../common/manager";


interface AccountWithBalance extends Account {
  balance: number;
}

class AccountManager implements IManager {
  protected accountRepository: Repository < Account > ;

  /**
   * FIXME
   * After defining the Account entity,
   * uncomment the lines in the constructor definition
   */
  constructor() {
    this.accountRepository = getRepository(Account);
  }

  /**
   * FIXME
   * Get an account
   *
   * Requirements:
   * - Derive balance (both debit and credit)
   */

  public async getAccount(accountId: string): Promise < AccountWithBalance > {

    // await this.accountRepository.findOne(accountId);
  

    let account = await this.accountRepository.findOne(accountId);
    
    const blankAccount = < AccountWithBalance > new Account();
  
    let accountBalanceDerived = 0.0;
    blankAccount.balance = accountBalanceDerived;


    return Promise.resolve(blankAccount);
  }

  public async createAccount(details: Partial < Account > ): Promise < Account > {
    const newAccount = new Account();
    newAccount.name = details.name;
    newAccount.owner = details.owner;
    newAccount.id = details.id;
    return this.accountRepository.save(newAccount);
  }

  /**
   * FIXME
   * update account details
   */
  public async updateAccount(accountId: string, changes: Partial < Account > ): Promise < Account > {
    let accountToUpdate = await this.accountRepository.findOne(accountId);
    accountToUpdate.name = changes.name;
    return this.accountRepository.save(accountToUpdate);
  }

  /**
   * FIXME
   * delete account
   *
   * Requirements:
   * - Cascade and delete all transactions
   */
  public async deleteAccount(accountId: string): Promise < DeleteResult | void > {
  return await this.accountRepository.delete({
      id: accountId
    }); 
  }
}

export default AccountManager;