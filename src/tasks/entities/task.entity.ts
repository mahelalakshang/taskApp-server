import { ObjectId } from 'mongodb';
import { Entity, ObjectIdColumn, Column } from 'typeorm';

@Entity()
export class Task {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: 'pending' })
  status: 'pending' | 'in-progress' | 'completed';

  @Column({ default: 'low' })
  priority: 'low' | 'medium' | 'high';

  @Column()
  userId: string; // Link task to user
}
