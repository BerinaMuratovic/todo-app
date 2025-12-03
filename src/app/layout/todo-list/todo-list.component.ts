import { Component, OnInit, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { Todo } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  todos$!: Observable<Todo[]>;

  editingId: number | null = null;
  editedText = '';

  showDeleteModal = false;
  todoToDelete: Todo | null = null;

  private todoService!: TodoService;
  private listId = 1;    

  constructor(
    private injector: Injector,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.todoService = this.injector.get(TodoService);

    const snapshot = this.route.snapshot;
    const paramId = snapshot.paramMap.get('id');

    if (paramId) {
      this.listId = Number(paramId);                
    } else {
      this.listId = (snapshot.data['listId'] as number) ?? 1; 
    }

    this.todos$ = this.todoService.getTodosForList(this.listId);
  }

  toggleTodo(id: number): void {
    this.todoService.toggleTodo(id);
  }

  openDetails(todo: Todo): void {
    this.router.navigate(['/todo', todo.id]);
  }

  openDeleteModal(todo: Todo): void {
    this.todoToDelete = todo;
    this.showDeleteModal = true;
  }

  confirmDelete(): void {
    if (this.todoToDelete) {
      this.todoService.removeTodo(this.todoToDelete.id);
    }
    this.closeDeleteModal();
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.todoToDelete = null;
  }

  startEdit(todo: Todo): void {
    this.editingId = todo.id;
    this.editedText = todo.text;
  }

  saveEdit(todo: Todo): void {
    if (this.editedText.trim()) {
      this.todoService.updateTodo({
        ...todo,
        text: this.editedText
      });
    }
    this.cancelEdit();
  }

  cancelEdit(): void {
    this.editingId = null;
    this.editedText = '';
  }
}
