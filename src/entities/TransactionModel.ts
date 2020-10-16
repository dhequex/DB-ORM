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

/**
 * FIXME
 */
@Entity({name: "transaction" /* Relation name in database */})
class Transaction {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @ManyToOne(() => Account, account => account.id, {onDelete:'CASCADE'})
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

  //@Column({ nullable: false})
  


  






}
 /* @Entity
class Transaction {
  public id: string;
  public amount: number;
  public account: Account;
  public transactionDate: Date;
  public description: string;
} */

export default Transaction;
