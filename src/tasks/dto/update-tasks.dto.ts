export class UpdateTaskDto {
  id: string;
  title: string;
  description: string;
  status: 'Not Started' | 'In Progress' | 'Done';
}
