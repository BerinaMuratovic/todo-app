import { Component } from '@angular/core';
import { HeaderComponent } from './layout/header/header.component';
import { TodoFormComponent } from './layout/todo-form/todo-form.component';
import { TodoListComponent } from './layout/todo-list/todo-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    TodoFormComponent,
    TodoListComponent
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  today = new Date().toDateString();
}
