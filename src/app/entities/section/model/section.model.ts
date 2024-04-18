import { Task } from '../../task/model/task.model';

export interface Section {
  id: string;
  title: string;
  tasks: Task[];
}
