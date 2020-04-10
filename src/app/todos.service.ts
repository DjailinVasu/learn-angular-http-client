import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { delay, catchError, map } from 'rxjs/operators';

export interface Todo {
  completed: boolean,
  title: string,
  id?: number
}


@Injectable({providedIn: 'root'})
export class TodosService {

  constructor(private http: HttpClient) {}

  addTodo(todo: Todo):Observable<Todo> {
    return this.http.post<Todo>('https://jsonplaceholder.typicode.com/todos', todo, {
      headers: new HttpHeaders({
        'MyHeader': Math.random().toString()
      })
    })
  }

  fetchTodos(): Observable<Todo[]> {
    let params = new HttpParams();
    params = params.set('_limit', '3');
    params = params.set('_some', '3');

    return this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos', {
      params,
      observe: 'response'
    })
    .pipe(
      map(response => {
        console.log('response', response);
        return response.body;
      }),
      delay(500),
      catchError(error => {
        console.log('Error:', error.message);
        return throwError(error)
      })
    )
  }

  removeTodo(id: number): Observable<void> {
    return  this.http.delete<void>(`https://jsonplaceholder.typicode.com/todos/${id}`)
  }

  completeTodo(id: number):Observable<Todo> {
    return this.http.put<Todo>(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      completed: true
    })
  }

}
