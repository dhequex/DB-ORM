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
  constructor() {
    this.accountRepository = getRepository(Account);
  }

  public async getAccount(accountId: string): Promise < AccountWithBalance > {

    let account = await this.accountRepository.findOne(accountId);
    if (!account) return null; // when count does nor

    const blankAccount = < AccountWithBalance > new Account();
    let accountBalanceDerived = 0.0;
    blankAccount.balance = accountBalanceDerived;
    blankAccount.id = accountId;
    blankAccount.name = account.name;

    return blankAccount;
  }

  public async createAccount(details: Partial < Account > ): Promise < Account > {
    const newAccount = new Account();
    newAccount.name = details.name;
    newAccount.owner = details.owner;
    newAccount.id = details.id;
    return this.accountRepository.save(newAccount);
  }


  public async updateAccount(accountId: string, changes: Partial < Account > ): Promise < Account > {
    let accountToUpdate = await this.accountRepository.findOne(accountId);
    accountToUpdate.name = changes.name;
    return this.accountRepository.save(accountToUpdate);
  }


  public async deleteAccount(accountId: string): Promise < DeleteResult | void > {
    return await this.accountRepository.delete({
      id: accountId
    });
  }
}

export default AccountManager;