import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter-dto';
import { UpdateTaskStatusDTO } from './dto/update-task-status.dto';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
  // The modifier `private`allow us to create a property `tasksService`
  constructor(private tasksService: TasksService) {}

  // Get All Tasks
  @Get()
  getTasks(@Query() filterDTO: GetTasksFilterDTO): Promise<Task[]> {
    return this.tasksService.getTasks(filterDTO);
  }

  // Create a Task
  @Post()
  createTask(@Body() createTaskDTO: CreateTaskDTO): Promise<Task> {
    // console.log(createTaskDTO);
    return this.tasksService.createTask(createTaskDTO);
  }

  // Get a Task By Id
  @Get('/:id')
  getTasksById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  // // Delete a Task By Id
  @Delete('/:id')
  deleteTaskById(@Param('id') id: string): Promise<void> {
    return this.tasksService.deleteTaskById(id); // return void
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDTO: UpdateTaskStatusDTO,
  ): Promise<Task> {
    const { status } = updateTaskStatusDTO;
    return this.tasksService.updateTaskStatus(id, status);
  }
}
