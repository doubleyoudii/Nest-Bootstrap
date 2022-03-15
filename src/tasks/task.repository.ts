import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskFilterDto } from './dto/task-filter.dto';
import { TaskStatus } from './task-status.enum.';
import { Task } from './task.entity';
import { User } from 'src/auth/user.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async createTask(createTask: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTask;

    const task = {
      title,
      description,
      status: TaskStatus.OPEN,
      user,
    };
    const createdTask = this.create(task);
    await this.save(createdTask);
    return createdTask;
  }

  async getAllTask(filter: TaskFilterDto, user: User): Promise<Task[]> {
    const { status, search } = filter;
    const query = this.createQueryBuilder('task');
    query.where('task.user = :user', { user: user.id });
    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }

    const tasks = await query.getMany();

    return tasks;
  }
}
