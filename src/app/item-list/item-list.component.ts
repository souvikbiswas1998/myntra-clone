import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { liveQuery } from 'dexie';
import { TodoList, db } from '../db.dexie';
import { FormsModule } from '@angular/forms';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { NgOptimizedImage } from '@angular/common';
import { provideImgixLoader } from '@angular/common';

@Component({
  selector: 'itemlist',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf, AsyncPipe, NgOptimizedImage],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.scss',
  providers: [provideImgixLoader("http://localhost:4200/assets/login-signup.webp")]
})
export class ItemListComponent implements OnChanges {
  @Input() todoList!: TodoList;
  // Observe an arbitrary query:
  todoItems$ = liveQuery(
    () => this.listTodoItems().then(d => {
      return Promise.all(d.map(d2 => {
        return (d2.image) ? this.decompress(d2.image).then(d3 => {
          console.log(d3.length);
          return ({ ...d2, image: d3 });
        }) : Promise.resolve(d2)
      }))
    })
  );

  constructor() {
    this.todoItems$.subscribe(d => {
      console.log(this.todoList.id, d);
    })
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.itemName = 'My new item in ' + this.todoList?.title
  }

  async listTodoItems() {
    return await db.todoItems
      .where({
        todoListId: this.todoList.id,
      })
      .toArray();
  }
  onDrop(file: any) {
    this.getBase64(file.files[0]);
  }
  async addItem() {
    let data = {
      title: this.itemName,
      todoListId: this.todoList.id || 0,
      image: ''
    }
    if (this.itemImage) data.image = this.itemImage;
    await db.todoItems.add(data);
  }

  async deleteList(id: number) {
    await db.todoItems.delete(id);
  }

  async dropList() {
    await db.todoItems.clear();
  }

  itemName = 'My new item';
  itemImage: any;

  getBase64(file: Blob) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      console.log(reader.result?.toString().length);
      this.compress(reader.result?.toString()).then(data => {
        this.itemImage = data
        console.log(data.byteLength);
      })

    });
    reader.readAsDataURL(file);
  }

  compress(string: string | undefined) {
    const byteArray = new TextEncoder().encode(string);
    const cs = new CompressionStream('deflate-raw');
    const writer = cs.writable.getWriter();
    writer.write(byteArray);
    writer.close();
    return new Response(cs.readable).arrayBuffer();
  }

  decompress(byteArray: any) {
    console.log(byteArray);
    const cs = new DecompressionStream('deflate-raw');
    const writer = cs.writable.getWriter();
    writer.write(byteArray);
    writer.close();
    return new Response(cs.readable).arrayBuffer().then(function (arrayBuffer) {
      return new TextDecoder().decode(arrayBuffer);
    });
  }
}