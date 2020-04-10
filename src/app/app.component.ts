import { Component, OnInit } from '@angular/core';
import { Todo, TodosService } from './todos.service';

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

  constructor(private todosService: TodosService) {}

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

    this.todosService.addTodo(newTodo)
    .subscribe(todo => {
      console.log('todo', todo);
      this.todos.push(todo);
      this.todoTitle = '';
    })
  }

  fetchTodos() {
    this.loading = true;
    this.todosService.fetchTodos()
    .subscribe(response => {
      console.log('get response', response);
      this.todos = response;
      this.loading = false;
    })
  }

  removeTodo(id: number) {
      this.todosService.removeTodo(id)
      .subscribe(response => {
        this.todos = this.todos.filter( t => t.id !== id )
      })
  }

}
