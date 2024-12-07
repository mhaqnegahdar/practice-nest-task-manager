import { IsEnum, IsNotEmpty, IsUUID } from 'class-validator';
import { TaskStatus } from '../task.model';

export class UpdateTaskDto {
  @IsUUID()
  id: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsEnum(TaskStatus)
  status: TaskStatus;
}
