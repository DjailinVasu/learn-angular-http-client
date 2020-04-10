import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Todo {
  completed: boolean,
  title: string,
  id?: number
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Angular httpClient';

  todos: Todo[] = []

  todoTitle = ''

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos?_limit=2')
    .subscribe(response => {
      console.log('get response', response);
      this.todos = response;
    })
  }

  addTodo() {
    if(!this.todoTitle.trim()) {
      return
    }

    const newTodo: Todo = {
      title: this.todoTitle,
      completed: false
    }

    this.http.post<Todo>('https://jsonplaceholder.typicode.com/todos', newTodo)
    .subscribe(todo => {
      console.log('todo', todo);
      this.todos.push(todo);
      this.todoTitle = '';
    })
  }
}
