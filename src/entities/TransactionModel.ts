import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinTable,
  JoinColumn,
} from "typeorm";
import Account from "./AccountModel";

@Entity({name: "transaction"})

class Transaction {

  constructor(details: Partial<Transaction>) {
   /*
      accountId: TEST_ACCOUNT_ID,
      account: Account
      amount: -2500.0,
      transactionDate: new Date(),
      description: "electricity bill",
    */
    Object.assign(this, details);
  }
  
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @ManyToOne(() => Account, account => account.id, {onDelete:'CASCADE', eager: true})
  account: Account;
  
  @Column({
    length: 100,
  })

  @Column({ nullable: false, type: "float" })
  public amount: number;

  @Column({ nullable: false, type: "timestamp with time zone" })
  public transactionDate: Date;

  @Column()
  public description: string;

}

export default Transaction;
