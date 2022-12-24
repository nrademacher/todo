import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Todo } from "./todo.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @OneToMany(() => Todo, (todo) => todo.user)
  todos: Todo[];
}
