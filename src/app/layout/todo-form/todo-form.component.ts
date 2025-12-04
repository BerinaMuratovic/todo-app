import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit {

  submitted = false;
  listId = 1; 

  todoForm = new FormGroup({
    text: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ])
  });

  constructor(
    private todoService: TodoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.setListFromUrl();

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.setListFromUrl());
  }

  private setListFromUrl(): void {
    const url = this.router.url;

    if (url.startsWith('/work')) {
      this.listId = 2;
    } else if (url.startsWith('/list/')) {
      const id = Number(url.split('/')[2]);
      if (!isNaN(id)) this.listId = id;
    } else {
      this.listId = 1;
    }
  }

  submit(): void {
    this.submitted = true;

    if (this.todoForm.invalid) return;

    this.todoService.addTodo(
      this.todoForm.value.text!, 
      this.listId
    );

    this.todoForm.reset();
    this.submitted = false;
  }
}
