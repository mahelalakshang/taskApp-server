import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { ObjectId } from 'mongodb';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: MongoRepository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto, user: any) {
    const task = this.taskRepository.create({
      ...createTaskDto,
      userId: user.userId,
    });
    return this.taskRepository.save(task);
  }

  async findAll(user: any, status?: string, priority?: string) {
    const query: any = { userId: user.userId };

    if (status) {
      query.status = status;
    }

    if (priority) {
      query.priority = priority;
    }

    return this.taskRepository.find({ where: query });
  }

  async update(id: string, updateTaskDto: UpdateTaskDto, user: any) {
    const task = await this.taskRepository.findOne({
      where: { _id: new ObjectId(id), userId: user.userId },
    });

    if (!task) {
      throw new Error('Task not found or not authorized');
    }

    const updated = Object.assign(task, updateTaskDto);
    return this.taskRepository.save(updated);
  }

  async updatePartial(
    id: string,
    partialDto: Partial<UpdateTaskDto>,
    user: any,
  ) {
    const task = await this.taskRepository.findOne({
      where: { _id: new ObjectId(id), userId: user.userId },
    });

    if (!task) {
      throw new Error('Task not found or not authorized');
    }

    Object.assign(task, partialDto);
    return this.taskRepository.save(task);
  }
}
