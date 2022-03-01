import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  //   private tasks: Task[] = [];
  private tasks: Task[] = [
    {
      id: '7357a633-6784-4e1b-a093-0cdc2fc72f25',
      title: 'testTitle1',
      description: 'testDescription1',
      status: TaskStatus.OPEN,
    },
    {
      id: 'fa46a618-3104-4d0d-a17f-7fc45ffe1e59',
      title: 'testTitle12',
      description: 'testDescription12',
      status: TaskStatus.OPEN,
    },
    {
      id: '17c584d8-e848-42f3-95d9-3fdc657e7682',
      title: 'testTitle123',
      description: 'testDescription123',
      status: TaskStatus.OPEN,
    },
  ];

  getTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    const task = this.tasks.find((task) => id === task.id);
    return task;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: v4(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);

    return task;
  }

  updateTask(id: string, body: UpdateTaskDto): Task {
    const { status } = body;
    const toBeupdated = this.tasks.findIndex((task) => task.id === id);
    if (toBeupdated === -1) {
      throw new Error('Cant find task with that ID');
    }
    this.tasks[toBeupdated].status = TaskStatus[`${TaskStatus[status]}`];
    // console.log(TaskStatus[`${TaskStatus[status]}`]);
    // console.log(status);
    // console.log(TaskStatus[status]);
    return this.tasks[toBeupdated];
  }

  deleteTaskById(id: string): Task {
    const deleted = this.tasks.findIndex((el) => {
      return el.id === id;
    });
    if (deleted === -1) {
      throw new Error('No Task with that Id');
    }
    return this.tasks.splice(deleted, 1)[0];
  }
}
