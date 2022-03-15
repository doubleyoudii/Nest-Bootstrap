import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskFilterDto } from './dto/task-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  async getTask(query: TaskFilterDto, user: User): Promise<Task[]> {
    return this.taskRepository.getAllTask(query, user);
  }
  async getTaskById(id: string, user: User): Promise<Task> {
    const task = await this.taskRepository.findOne({
      id,
      user,
    });
    if (!task) {
      throw new NotFoundException();
    }
    return task;
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto, user);
  }
  async updateTask(id: string, body: UpdateTaskDto, user: User): Promise<Task> {
    const { status } = body;
    const found = await this.getTaskById(id, user);
    found.status = status;
    await this.taskRepository.save(found);
    return found;
  }
  async deleteTaskById(id: string, user: User): Promise<void> {
    const found = await this.taskRepository.delete({ id, user });

    if (found.affected === 0) {
      throw new NotFoundException();
    }
    // return found;
  }
}
