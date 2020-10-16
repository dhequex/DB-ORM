import {
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne
} from "typeorm";
//import Transaction from "./TransactionModel";
import User from "./UserModel";

@Entity({
  name: "account"
})
class Account {

  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @ManyToOne(() => User, owner => owner.id, {
    onDelete: 'CASCADE'　
  })
  　owner: User;

  @Column({
    length: 100,
  })

  @Column({
    nullable: false
  })
  public name: string;
}

export default Account;