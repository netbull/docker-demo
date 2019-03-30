import { TasksService } from './tasks.service';
import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CreateTaskComponent } from './create-task/create-task.component';
import { pipe } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('checklist') checklist;

  tasks: any[] = [];
  subscription: any;

  constructor(
    public dialog: MatDialog,
    private tasksService: TasksService
  ) {}

  ngOnInit() {
    this.subscription = this.tasksService.list().subscribe((tasks: any[]) => {
      this.tasks = tasks;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  selectionChange({ option }) {
    const { value, selected } = option;
    const { title } = this.tasks.find(task => task.id === value);
    this.tasksService
      .update(value, { title, done: selected })
      .pipe(first())
      .subscribe(() => console.log('>> updated status'));
  }

  createTask() {
    const dialogRef = this.dialog.open(CreateTaskComponent, {
      width: '30rem',
    });

    dialogRef.afterClosed().subscribe(data => {
      if (typeof data !== 'undefined') {
        const { title } = data;
        if (typeof title !== 'undefined') {
          this.tasksService
            .create({ title })
            .pipe(first())
            .subscribe(() => console.log('>> created task'));
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
