import { Injectable } from '@nestjs/common';

import { v4 as uuid } from 'uuid';
import { promises as fs } from 'fs';
import { CreateTaskDto } from './dto/create-tasks.dto';
import { Task } from './task.model';
import { UpdateTaskDto } from './dto/update-tasks.dto';

@Injectable()
export class TasksService {
  private dataArr = [];
  private filePath = process.cwd() + '/data/data.json';

  async create(task: CreateTaskDto): Promise<Task> {
    await this.readFile();

    this.dataArr.push({ ...task, id: uuid() });

    await this.writeFile();

    return this.dataArr.at(-1);
  }

  async findAll(): Promise<Task[]> {
    await this.readFile();

    return this.dataArr;
  }

  async findOne(id: string): Promise<Task> {
    await this.readFile();

    return this.dataArr.find((task) => task.id === id);
  }

  async update(updatedTask: UpdateTaskDto): Promise<Task> {
    await this.readFile();

    const taskIndex = this.dataArr.findIndex(
      (task) => task.id === updatedTask.id,
    );
    this.dataArr[taskIndex] = { ...updatedTask };

    await this.writeFile();

    return this.dataArr[taskIndex];
  }

  async remove(id: string): Promise<Task[]> {
    await this.readFile();

    this.dataArr = this.dataArr.filter((task) => task.id !== id);

    await this.writeFile();

    return this.dataArr;
  }

  async readFile(): Promise<Task[]> {
    try {
      const data = await fs.readFile(this.filePath, 'utf8');
      this.dataArr = JSON.parse(data) || [];
      return this.dataArr;
    } catch (err) {
      console.error('Error reading file:', err);
      return [];
    }
  }

  async writeFile(): Promise<Task[]> {
    try {
      await fs.writeFile(
        this.filePath,
        JSON.stringify(this.dataArr, null, 2),
        'utf8',
      );
      return this.dataArr;
    } catch (err) {
      console.error('Error writing file:', err);
      throw err;
    }
  }
}
