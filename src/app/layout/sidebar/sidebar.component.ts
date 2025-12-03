import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { TodoService } from '../../services/todo.service';
import { TodoList } from '../../models/todo-list.model';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,     
    FormsModule,      
    RouterModule      
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  
  lists$: Observable<TodoList[]>;

  showCreateListModal = false;
  newListName = '';

  constructor(private todoService: TodoService) {
    this.lists$ = this.todoService.getLists().pipe(
      map(lists => lists.filter(list => list.id > 2))
    );
  }

  openCreateListModal(): void {
    this.showCreateListModal = true;
  }

  closeCreateListModal(): void {
    this.showCreateListModal = false;
    this.newListName = '';
  }

  createList(): void {
    const name = this.newListName.trim();
    if (!name) return;

    this.todoService.addList(name);
    this.closeCreateListModal();
  }
}
