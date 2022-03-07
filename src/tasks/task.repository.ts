import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum.';
import { Task } from './task.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async createTask(createTask: CreateTaskDto): Promise<Task> {
    const { title, description } = createTask;

    const task = {
      title,
      description,
      status: TaskStatus.OPEN,
    };
    const createdTask = this.create(task);
    await this.save(createdTask);
    return createdTask;
  }
}
