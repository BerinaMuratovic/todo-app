import { Component } from '@angular/core';
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
export class TodoListComponent {

  todos$: Observable<Todo[]>;

  editingId: number | null = null;
  editedText: string = '';

  constructor(private todoService: TodoService) {
    this.todos$ = this.todoService.getTodos();
  }

  toggleTodo(id: number): void {
    this.todoService.toggleTodo(id);
  }

  removeTodo(id: number): void {
    this.todoService.removeTodo(id);
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
