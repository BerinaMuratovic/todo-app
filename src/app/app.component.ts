import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { TodoFormComponent } from './layout/todo-form/todo-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,        
    SidebarComponent,
    TodoFormComponent    
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  today = new Date().toDateString();
}
