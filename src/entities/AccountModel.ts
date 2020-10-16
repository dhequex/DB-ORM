import { Entity, OneToMany, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
//import Transaction from "./TransactionModel";
import User from "./UserModel";

/**
 * FIXME
 */


 // make primary key ID with uuid

 // make name not null string

 //owner not null string which points to users primary key


@Entity({name: "Account"})
 class Account {

  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @ManyToOne(() => User, user => user.id, {onDelete:'CASCADE'})
   user: User;

  @Column({
    length: 100,
  })

  @Column({ nullable: false })
  public name: string;

 // @Column({ nullable: false })
  //public owner: User;
  
  
 // public displayName: string;
 // public id: string;
 // public transactions: Transaction[];
 // public name: string;
  //public owner: User;
}

export default Account;
