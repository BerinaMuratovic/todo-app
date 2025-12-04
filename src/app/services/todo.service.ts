import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Todo } from '../models/todo.model';
import { TodoList } from '../models/todo-list.model';

@Injectable({ providedIn: 'root' })
export class TodoService {

  private nextTodoId = 1;
  private nextListId = 3;

  private listsSubject = new BehaviorSubject<TodoList[]>([
    {
      id: 1,
      name: 'Personal',
      category: 'personal',
      todos: []
    },
    {
      id: 2,
      name: 'Work',
      category: 'work',
      todos: []
    }
  ]);

  lists$ = this.listsSubject.asObservable();


  getLists(): Observable<TodoList[]> {
    return this.lists$;
  }

  addList(name: string): void {
    const newList: TodoList = {
      id: this.nextListId++,
      name,
      category: 'personal', 
      todos: []
    };

    this.listsSubject.next([...this.listsSubject.value, newList]);
  }


  getTodosForList(listId: number): Observable<Todo[]> {
    return this.lists$.pipe(
      map(lists => lists.find(l => l.id === listId)?.todos ?? [])
    );
  }

  getTodoById(id: number): Observable<Todo | undefined> {
    return this.lists$.pipe(
      map(lists => lists.flatMap(l => l.todos).find(t => t.id === id))
    );
  }

  addTodo(text: string, listId: number): void {
    this.listsSubject.next(
      this.listsSubject.value.map(list =>
        list.id === listId
          ? {
              ...list,
              todos: [
                ...list.todos,
                {
                  id: this.nextTodoId++,
                  text,
                  completed: false,
                  category: list.category
                }
              ]
            }
          : list
      )
    );
  }

  toggleTodo(id: number): void {
    this.updateTodoInternal(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
  }

  updateTodo(updatedTodo: Todo): void {
    this.updateTodoInternal(todo =>
      todo.id === updatedTodo.id ? updatedTodo : todo
    );
  }

  removeTodo(id: number): void {
    this.listsSubject.next(
      this.listsSubject.value.map(list => ({
        ...list,
        todos: list.todos.filter(t => t.id !== id)
      }))
    );
  }

  private updateTodoInternal(
    fn: (todo: Todo) => Todo
  ): void {
    this.listsSubject.next(
      this.listsSubject.value.map(list => ({
        ...list,
        todos: list.todos.map(fn)
      }))
    );
  }
}
