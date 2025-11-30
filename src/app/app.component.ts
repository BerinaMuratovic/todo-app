import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';   
import { Observable } from 'rxjs';

import { TodoService } from './services/todo.service';
import { TodoList } from './models/todo-list.model';

import { HeaderComponent } from './layout/header/header.component';
import { TodoFormComponent } from './layout/todo-form/todo-form.component';
import { TodoListComponent } from './layout/todo-list/todo-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,        
    HeaderComponent,
    TodoFormComponent,
    TodoListComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  today: string = new Date().toDateString();

  lists$: Observable<TodoList[]>;
  activeListId = 1;

  showCreateListModal = false;
  newListName = '';

  constructor(private todoService: TodoService) {
    this.lists$ = this.todoService.getLists();
  }

  selectList(id: number): void {
    this.activeListId = id;
    this.todoService.setActiveList(id);
  }

  openCreateListModal(): void {
    this.showCreateListModal = true;
  }

  closeCreateListModal(): void {
    this.showCreateListModal = false;
    this.newListName = '';
  }

  createList(): void {
    if (this.newListName.trim()) {
      this.todoService.addList(this.newListName.trim());
      this.closeCreateListModal();
    }
  }
}
