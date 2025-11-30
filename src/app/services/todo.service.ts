import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  // BehaviorSubject stores the current state of todos
  private todosSubject = new BehaviorSubject<Todo[]>([]);

  // Observable exposed to components
  todos$: Observable<Todo[]> = this.todosSubject.asObservable();

  private nextId = 1;

  constructor() {}

 
  getTodos(): Observable<Todo[]> {
    return this.todos$;
  }


  addTodo(text: string): void {
    const newTodo: Todo = {
      id: this.nextId++,
      text,
      completed: false
    };

    const currentTodos = this.todosSubject.value;
    this.todosSubject.next([...currentTodos, newTodo]);
  }


  updateTodo(updatedTodo: Todo): void {
    const updatedTodos = this.todosSubject.value.map(todo =>
      todo.id === updatedTodo.id ? updatedTodo : todo
    );

    this.todosSubject.next(updatedTodos);
  }


  toggleTodo(id: number): void {
    const updatedTodos = this.todosSubject.value.map(todo =>
      todo.id === id
        ? { ...todo, completed: !todo.completed }
        : todo
    );

    this.todosSubject.next(updatedTodos);
  }


  removeTodo(id: number): void {
    const updatedTodos = this.todosSubject.value.filter(
      todo => todo.id !== id
    );

    this.todosSubject.next(updatedTodos);
  }
}
