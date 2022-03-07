import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum.';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskFilterDto } from './dto/task-filter.dto';

@Injectable()
export class TasksService {
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
  // getTaskById(id: string): Task {
  //   const task = this.tasks.find((task) => id === task.id);
  //   if (!task) {
  //     throw new NotFoundException();
  //   }
  //   return task;
  // }
  // createTask(createTaskDto: CreateTaskDto): Task {
  //   const { title, description } = createTaskDto;
  //   const task: Task = {
  //     id: v4(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   };
  //   this.tasks.push(task);
  //   return task;
  // }
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
