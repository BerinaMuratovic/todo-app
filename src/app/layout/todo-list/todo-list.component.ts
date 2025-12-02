import { Component, OnInit, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

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

  constructor(private injector: Injector) {}

  ngOnInit(): void {
    this.todoService = this.injector.get(TodoService);
    this.todos$ = this.todoService.getActiveTodos();
  }

  toggleTodo(id: number): void {
    this.todoService.toggleTodo(id);
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
