import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent {

  todoText: string = '';

  constructor(private todoService: TodoService) {}

  addTodo(): void {
    if (this.todoText.trim()) {
      this.todoService.addTodo(this.todoText);
      this.todoText = '';
    }
  }
}
