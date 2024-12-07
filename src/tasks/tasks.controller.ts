import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-tasks.dto';
import { Task } from './task.model';
import { TasksService } from './tasks.service';
import { UpdateTaskDto } from './dto/update-tasks.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(@Body() task: CreateTaskDto): Promise<Task> {
    return await this.tasksService.create(task);
  }
  @Get()
  async findAll(): Promise<Task[]> {
    return await this.tasksService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<Task> {
    return await this.tasksService.findOne(id);
  }

  @Patch()
  async update(@Body() task: UpdateTaskDto): Promise<Task> {
    return await this.tasksService.update(task);
  }

  @Delete(':id')
  async remove(@Param('id', new ParseUUIDPipe()) id: string): Promise<Task[]> {
    return await this.tasksService.remove(id);
  }
}
