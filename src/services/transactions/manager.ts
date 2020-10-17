import Account from "entities/AccountModel";
import {
  Repository,
  getRepository,
  DeleteResult,
  MoreThanOrEqual,
  createConnection
} from "typeorm";
import Transaction from "../../entities/TransactionModel";
//import Manager from "src/services/accounts/manager.ts"
import {
  IManager
} from "../common/manager";

interface TransactionWithAccountId extends Transaction {
  accountId: string;
}

/**
 * Entity manager for User model
 * This is where you define logic to access data from database
 *
 * To read more about using a Manager object,
 * refer to UserManager class in `src/service/users/manager.ts`
 */
class TransactionManager implements IManager {
  protected transactionRepository: Repository < Transaction > ;
  constructor() {
    this.transactionRepository = getRepository(Transaction);
  }

  /**
   * FIXME
   * Get a transaction from database
   */
  public async getTransaction(transactionId: string): Promise < Transaction > {
    return this.transactionRepository.findOne(transactionId);

  }
  
  
  public async listTransactionsByIds(transactionIds: string[]): Promise < Transaction[] > {
    const transactions = await this.transactionRepository.findByIds(transactionIds);
    return transactions;
  }


  public async listTransactionsInAccount(accountId: string): Promise < Transaction[] > {
    // get transaction that have foreign key "account ID"
    const transactions = await this.transactionRepository.find({
      where: {account: accountId}
    })
    return transactions;
  }

  /**
   * FIXME
   * Get a list of transactions less than `maximumAmount` in a particular `account`
   */
  public async filterTransactionsByAmountInAccount(accountId: string, maximumAmount: number): Promise < Transaction[] > {
    
   //const lessThan = await this.transactionRepository.find({
 //     accountId: LessThanOrEqual(maximumAmount)
 // });
    return Promise.resolve([]);
  }

  /**
   * FIXME
   * create a new transaction
   */
  public async createTransaction(details: Partial < TransactionWithAccountId > ): Promise < Transaction > {
     let newTransaction = new Transaction(details);
     
     return this.transactionRepository.save(newTransaction);
  } 


  public async updateTransaction(
    transactionId: string,
    changes: Partial<TransactionWithAccountId>,
  ): Promise<Transaction> {
    if ("accountId" in changes) {
        changes = {
            ...changes,
            account: <any>{ id: changes.accountId }
        };
    }
    await this.transactionRepository.update(transactionId, changes);
    return this.transactionRepository.findOne(transactionId);
  
  }

  /**
   * FIXME
   * delete a transaction
   */
  public async deleteTransaction(transactionId): Promise < DeleteResult | void > {
    return Promise.resolve();
  }
}

export default TransactionManager;