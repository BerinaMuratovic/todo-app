import { Todo } from './todo.model';

export interface TodoList {
  id: number;
  name: string;
  category: 'personal' | 'work';
  todos: Todo[];
}
