import { Component, VERSION } from '@angular/core';
import { liveQuery } from 'dexie';
import { db, TodoList } from '../db';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular_indexdb_dexie';
  todoLists$ = liveQuery(() => db.todoLists.toArray());
  listName = 'My new list';

  async addNewList() {
    await db.todoLists.add({
      title: this.listName,
    });
  }

  identifyList(index: number, list: TodoList) {
    return `${list.id}${list.title}`;
  }
}
