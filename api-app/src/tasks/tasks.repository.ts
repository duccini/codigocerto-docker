import { DataSource, Repository } from 'typeorm';
import { Task } from './task.entity';
import { Injectable } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDTO } from './dto/get-tasks-filter-dto';

@Injectable()
export class TasksRepository extends Repository<Task> {
  constructor(private dataSource: DataSource) {
    super(Task, dataSource.createEntityManager()); // o que é isso ??
  }

  async getTasks(filterDTO: GetTasksFilterDTO): Promise<Task[]> {
    const { status, search } = filterDTO;

    const query = this.createQueryBuilder('task');

    if (status) {
      query.andWhere('task.status = :queryStatus', { queryStatus: status });
    }

    if (search) {
      query.andWhere(
        'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',
        { search: `%${search}%` },
      );
    }

    const tasks = await query.getMany();
    return tasks;
  }

  async createTask(createTaskDTO: CreateTaskDTO): Promise<Task> {
    const { title, description } = createTaskDTO;

    // Create the object based on the repository
    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });

    // saving the data
    await this.save(task);
    return task;
  }
}
