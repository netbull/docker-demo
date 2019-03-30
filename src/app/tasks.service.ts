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
    const form = new FormData();
    form.append('title', title);
    return this.http.post(`${this.url}/task`, form, { headers: this.headers });
  }

  update(id, { title, done }) {
    const form = new FormData();
    form.append('title', title);
    form.append('done', done);
    return this.http.patch(`${this.url}/task/${id}`, form, {
      headers: this.headers
    });
  }

}
