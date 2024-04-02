import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { liveQuery } from 'dexie';
import { db, TodoItem, TodoList } from '../../db';

@Component({
  selector: 'app-itemlist',
  templateUrl: './itemlist.component.html',
  styleUrl: './itemlist.component.scss',
})
export class ItemlistComponent {
  @Input() todoList!: TodoList;
  // Observe an arbitrary query:
  todoItems$ = liveQuery(() => this.listTodoItems());

  async listTodoItems() {
    return await db.todoItems
      .where({
        todoListId: this.todoList.id,
      })
      .toArray();
  }

  async addItem() {
    await db.todoItems.add({
      title: this.itemName,
      todoListId: this.todoList.id || 1,
    });
  }

  itemName = 'My new item';
}
