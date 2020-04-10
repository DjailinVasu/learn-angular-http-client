import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay } from 'rxjs/operators'

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

  todos: Todo[] = [];

  todoTitle = '';

  loading = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
   this.fetchTodos();
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

  fetchTodos() {
    this.loading = true;
    this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos?_limit=2')
    .pipe(delay(500))
    .subscribe(response => {
      console.log('get response', response);
      this.todos = response;
      this.loading = false;
    })
  }

  removeTodo(id: number) {
      this.http.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .subscribe(response => {
        this.todos = this.todos.filter( t => t.id !== id )
      })
  }

}
