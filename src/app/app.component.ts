import { TasksService } from './tasks.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CreateTaskComponent } from './create-task/create-task.component';
import { pipe } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  @ViewChild("checklist") checklist;

  tasks: any[] = [];
  subscription: any;

  constructor(public dialog: MatDialog, private tasksService: TasksService) {}

  ngOnInit() {
    this.subscription = this.tasksService
      .list()
      .pipe(first())
      .subscribe(this.setTasks());
  }

  setTasks() {
    return tasks => {
      this.tasks = tasks;
    };
  }

  selectionChange(task) {
    const { id, done, title } = task;
    this.tasksService
      .update(id, { title, done: done ? 0 : 1 })
      .pipe(
        first(),
        switchMap(() => this.tasksService.list())
      )
      .subscribe(this.setTasks());
  }

  delete(id) {
    this.tasksService
      .delete(id)
      .pipe(
        first(),
        switchMap(() => this.tasksService.list())
      )
      .subscribe(this.setTasks());
  }

  createTask() {
    const dialogRef = this.dialog.open(CreateTaskComponent, {
      width: "30rem"
    });

    dialogRef.afterClosed().subscribe(data => {
      if (typeof data !== "undefined") {
        const { title } = data;
        if (typeof title !== "undefined") {
          this.tasksService
            .create({ title })
            .pipe(
              first(),
              switchMap(() => this.tasksService.list())
            )
            .subscribe(this.setTasks());
        }
      }
    });
  }

  get completion() {
    return (this.tasksDone / this.tasks.length) * 100;
  }

  get tasksDone() {
    return this.tasks.filter(({ done }) => !!done).length;
  }
}
