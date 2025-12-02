import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

import { TodoService } from '../../services/todo.service';
import { TodoList } from '../../models/todo-list.model';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

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
