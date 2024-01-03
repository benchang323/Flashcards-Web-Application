// Path: src/user/user.entity.ts
// Some components are refactored or modified from classwork

import { Deck } from "../decks/deck.entity";
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  displayName: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ unique: true })
  username: string;

  @OneToMany(() => Deck, (deck) => deck.user)
  decks: Deck[];

  @Column()
  password: string;
}
