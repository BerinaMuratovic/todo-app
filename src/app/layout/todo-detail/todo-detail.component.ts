import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-todo-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-detail.component.html'
})
export class TodoDetailComponent implements OnInit {

  todo?: Todo;

  constructor(
    private todoService: TodoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.todoService.getTodoById(id).subscribe(todo => this.todo = todo);
  }
}
