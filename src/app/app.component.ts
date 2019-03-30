import { TasksService } from './tasks.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CreateTaskComponent } from './create-task/create-task.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('checklist') checklist;

  tasks: any[] = [];
  subscription: any;

  constructor(
    public dialog: MatDialog,
    private tasksService: TasksService
  ) {}

  ngOnInit() {
    this.subscription = this.tasksService.list().subscribe(tasks => {
      console.log(tasks);
    });
  }

  selectionChange({ option }) {
    const { value, selected } = option;
    this.tasks.find(task => task.id === value).done = selected;
  }

  createTask() {

    const dialogRef = this.dialog.open(CreateTaskComponent, {
      width: '30rem',
    });

    dialogRef.afterClosed().subscribe(({ title }) => {
      if (typeof title !== 'undefined') {
        this.tasks.push({
          id: this.tasks.length + 1,
          title,
          done: false
        });
      }
    });
  }

  get completion() {
    return (this.tasksDone / this.tasks.length) * 100;
  }

  get tasksDone() {
    return this.tasks.filter(({ done }) => !!done).length;
  }

  private sortBy(key) {
    return (a, b) => (a[key] > b[key]) ? 1 : ((b[key] > a[key]) ? -1 : 0);
  }
}
