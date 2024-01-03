// Path: src/decks/deck.entity.ts
// Some components are refactored or modified from classwork

import { User } from "src/user/user.entity";
import { Card } from "src/cards/card.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Deck {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  image: string;

  @ManyToOne(() => User, (user) => user.decks)
  @JoinColumn({ name: "userId" })
  user: User;

  @Column()
  userId: number;

  @Column({ default: 0 })
  numberOfCards: number;

  @CreateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @OneToMany(() => Card, (card) => card.deck)
  cards: Card[];
}
