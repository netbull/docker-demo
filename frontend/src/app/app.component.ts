import { Component, ViewChild } from '@angular/core';

interface Task {
  title: string;
  done: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('checklist') checklist;

  tasks: Task[] = [{
    title: 'Create angular app',
    done: false
  }, {
    title: 'Add angular material',
    done: false
  }, {
    title: 'Update tslint rules',
    done: false
  }, {
    title: 'Setup styleguide',
    done: false
  }, {
    title: 'Integrate firebase authentication',
    done: false
  }, {
    title: 'Create todo list markup',
    done: false
  }];

  get completion() {
    return (this.checklist.selectedOptions.selected.length / this.tasks.length) * 100;
  }
}
