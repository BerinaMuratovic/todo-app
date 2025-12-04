import { Routes } from '@angular/router';
import { TodoListComponent } from './layout/todo-list/todo-list.component';

export const routes: Routes = [
  {
    path: '',
    component: TodoListComponent,
    data: { listId: 1 }          
  },
  {
    path: 'work',
    component: TodoListComponent,
    data: { listId: 2 }          
  },
  {
    path: 'list/:id',            
    component: TodoListComponent
  },
  
  {
    path: '**',
    redirectTo: ''
  }
];
