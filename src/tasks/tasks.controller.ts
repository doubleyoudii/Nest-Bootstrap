import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskFilterDto } from './dto/task-filter.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(@Query() query: TaskFilterDto): Task[] {
    if (Object.keys(query).length) {
      return this.tasksService.getTaskwithFilter(query);
    } else {
      return this.tasksService.getTasks();
    }
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() body: CreateTaskDto): Task {
    return this.tasksService.createTask(body);
  }

  @Patch('/:id/status')
  updateTask(@Body() body: UpdateTaskDto, @Param('id') id: string): Task {
    return this.tasksService.updateTask(id, body);
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string): Task {
    return this.tasksService.deleteTaskById(id);
  }
}
