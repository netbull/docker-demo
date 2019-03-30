import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  url: string = 'http://docker-demo-api.info-portal.bg';
  constructor(private http: HttpClient) { }

  list() {
    return this.http.get(`${this.url}/tasks`);
  }

  create(data) {
    return this.http.post(`${this.url}/task`, data);
  }

  update(id, data) {
    return this.http.patch(`${this.url}/task/${id}`, data);
  }

}
