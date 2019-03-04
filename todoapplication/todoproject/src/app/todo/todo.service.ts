import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class TodoService {
  constructor(private http: HttpClient) {

  }

  getTodos(): Observable<any> {
    return this.http.get('api/todos', httpOptions ).pipe(map((res: Response) => {
      return res;
    }));
  }

  addTodo(todo) {
    return this.http.post('api/todos/add', todo , httpOptions ).pipe(
      map((res: Response) => {
        return res;
      }));

  }

  deleteTodo(todo) {
    return this.http.delete(`api/todos/delete/${todo.item}`, httpOptions ).pipe(
      map((res: Response) => {
        return res;
      }));
  }

  updateTodo(prevTodo, newVal) {
    return this.http.put(`api/todos/update/${prevTodo.item}`, newVal , httpOptions ).pipe(
      map((res: Response) => {
        return res;
      }));
  }
}

