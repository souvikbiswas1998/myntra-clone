import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FooterConfig } from './route.config';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { AuthService } from './authentication/auth.service';
import { environment } from '../environments/environment.development';
import { liveQuery } from 'dexie';
import { TodoList, db } from './db.dexie';
import { FormsModule } from '@angular/forms';
import { ItemListComponent } from './item-list/item-list.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule, AsyncPipe, ItemListComponent, RouterModule, ToolbarModule, ButtonModule, MatToolbarModule, MatIconModule, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [AuthService]
})
export class AppComponent implements OnInit {
  showBottomNav: boolean = false;
  constructor(private router: Router) {
    console.log(environment.from);

    router.events.subscribe(event => {
      // only interested in the NavigationEnd type of event
      if (event instanceof NavigationEnd) this.showBottomNav = FooterConfig[event.url]
    });
  }

  ngOnInit(): void {
    // this.todoLists$.subscribe(d => {
    //   console.log(d);
    // })
  }

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
