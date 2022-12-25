import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Unique } from "typeorm";
import { Todo } from "./todo.entity";

@Entity()
@Unique(["email"])
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  passwordHash: string;

  @OneToMany(() => Todo, (todo) => todo.user)
  todos: Todo[];
}
