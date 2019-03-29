import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CreateTaskComponent } from './create-task/create-task.component';

interface Task {
  id: number;
  title: string;
  done: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('checklist') checklist;

  tasks: Task[];

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    this.tasks = [{
      id: 1,
      title: 'Create angular app',
      done: false
    }, {
      id: 2,
      title: 'Add angular material',
      done: false
    }, {
      id: 3,
      title: 'Update tslint rules',
      done: false
    }, {
      id: 4,
      title: 'Setup styleguide',
      done: false
    }, {
      id: 5,
      title: 'Integrate firebase authentication',
      done: false
    }, {
      id: 6,
      title: 'Create todo list markup',
      done: false
    }];
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
