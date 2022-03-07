import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum.';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskFilterDto } from './dto/task-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}
  // getTasks(): Task[] {
  //   return this.tasks;
  // }
  // getTaskwithFilter(query: TaskFilterDto): Task[] {
  //   const { status, search } = query;
  //   let tasksArr: Task[] = this.tasks;
  //   if (status) {
  //     tasksArr = tasksArr.filter((task) => task.status === status);
  //   }
  //   if (search) {
  //     tasksArr = tasksArr.filter((task) => {
  //       if (task.title.includes(search) || task.description.includes(search)) {
  //         return true;
  //       }
  //       return false;
  //     });
  //   }
  //   return tasksArr;
  // }
  async getTaskById(id: string): Promise<Task> {
    const task = await this.taskRepository.findOne({ id });
    if (!task) {
      throw new NotFoundException();
    }
    return task;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }
  // updateTask(id: string, body: UpdateTaskDto): Task {
  //   const { status } = body;
  //   const found = this.getTaskById(id);
  //   found.status = status;
  //   return found;
  // }
  // deleteTaskById(id: string): Task {
  //   const found = this.getTaskById(id);
  //   const deleted = this.tasks.findIndex((el) => {
  //     return el.id === found.id;
  //   });
  //   return this.tasks.splice(deleted, 1)[0];
  // }
}
