import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Todo {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  title: string;

  @Column({ default: "" })
  description?: string;

  @Column({ default: false })
  done: boolean;

  @ManyToOne(() => User, (user) => user.todos)
  user: User;
}
