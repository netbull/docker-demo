import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  url = 'http://docker-demo-api.info-portal.bg';
  constructor(private http: HttpClient) { }
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

  list() {
    return this.http.get(`${this.url}/tasks`);
  }

  create({ title }) {
    return this.http.post(`${this.url}/task`, `title=${title}`, { headers: this.headers });
  }

  update(id, { title, done }) {
    return this.http.post(`${this.url}/task/${id}`, `title=${title}&done=${done}`, {
      headers: this.headers
    });
  }

  delete(id) {
    return this.http.post(`${this.url}/task/delete/${id}`, null, { headers: this.headers });
  }

}
