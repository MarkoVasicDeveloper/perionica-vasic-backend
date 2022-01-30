/* eslint-disable prettier/prettier */
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';

@Index('FK_message_user', ['userId'], {})
@Entity('message', { schema: 'perionica_vasic' })
export class Message {
  @PrimaryGeneratedColumn({ type: 'int', name: 'message_id', unsigned: true })
  messageId: number;

  @Column('varchar', { name: 'message', length: 255, default: () => "'0'" })
  message: string;

  @Column('int', { name: 'user_id', unsigned: true })
  userId: number;

  @Column('timestamp', {
    name: 'create_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @ManyToOne(() => User, (user) => user.messages, {
    onDelete: 'CASCADE',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'userId' }])
  user: User;
}
