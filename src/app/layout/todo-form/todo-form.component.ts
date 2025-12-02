import { Component, OnInit, Injector } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit {

  private todoService!: TodoService;

  submitted = false;

  todoForm = new FormGroup({
    text: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ])
  });

 
  constructor(private injector: Injector) {}

 
  ngOnInit(): void {
    this.todoService = this.injector.get(TodoService);
  }

  submit(): void {
    this.submitted = true;

    if (this.todoForm.invalid) {
      return;
    }

    this.todoService.addTodo(this.todoForm.value.text!);

    this.todoForm.reset();
    this.submitted = false;
  }
}
