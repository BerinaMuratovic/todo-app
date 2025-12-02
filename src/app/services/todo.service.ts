import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { TodoList } from '../models/todo-list.model';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private listsSubject = new BehaviorSubject<TodoList[]>([
    { id: 1, name: 'Personal', todos: [] },
    { id: 2, name: 'Work', todos: [] }
  ]);

  lists$ = this.listsSubject.asObservable();

  private activeListId = 1;
  private nextTodoId = 1;
  private nextListId = 3;

  
  getLists(): Observable<TodoList[]> {
    return this.lists$;
  }


  setActiveList(id: number): void {
    this.activeListId = id;
    this.listsSubject.next([...this.listsSubject.value]);
  }


  getActiveTodos(): Observable<Todo[]> {
    return this.lists$.pipe(
      map(lists => {
        const active = lists.find(l => l.id === this.activeListId);
        return active ? active.todos : [];
      })
    );
  }


  addList(name: string): void {
    const newList: TodoList = {
      id: this.nextListId++,
      name,
      todos: []
    };

    this.listsSubject.next([...this.listsSubject.value, newList]);
  }

 
  addTodo(text: string): void {
    const updatedLists: TodoList[] = this.listsSubject.value.map(list => {
      if (list.id !== this.activeListId) return list;

      const newTodo: Todo = {
        id: this.nextTodoId++,
        text,
        completed: false,
        category: list.name === 'Work' ? 'work' : 'personal'
      };

      return {
        ...list,
        todos: [...list.todos, newTodo]
      };
    });

    this.listsSubject.next(updatedLists);
  }

  toggleTodo(todoId: number): void {
    const updatedLists: TodoList[] = this.listsSubject.value.map(list =>
      list.id === this.activeListId
        ? {
            ...list,
            todos: list.todos.map(todo =>
              todo.id === todoId
                ? { ...todo, completed: !todo.completed }
                : todo
            )
          }
        : list
    );

    this.listsSubject.next(updatedLists);
  }


  updateTodo(updatedTodo: Todo): void {
    const updatedLists: TodoList[] = this.listsSubject.value.map(list =>
      list.id === this.activeListId
        ? {
            ...list,
            todos: list.todos.map(todo =>
              todo.id === updatedTodo.id ? updatedTodo : todo
            )
          }
        : list
    );

    this.listsSubject.next(updatedLists);
  }


  removeTodo(todoId: number): void {
    const updatedLists: TodoList[] = this.listsSubject.value.map(list =>
      list.id === this.activeListId
        ? {
            ...list,
            todos: list.todos.filter(todo => todo.id !== todoId)
          }
        : list
    );

    this.listsSubject.next(updatedLists);
  }
}
