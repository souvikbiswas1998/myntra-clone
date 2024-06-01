import { Injectable } from '@angular/core';
import { liveQuery } from 'dexie';
import { db } from './index.db';
import { LoginApiResponse } from './authentication/auth.interface';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor() { }
  user$ = liveQuery(() => db.user.toArray());

  async editItem(loginDetails:LoginApiResponse, id:string) {
    await db.user.update(id, {user: loginDetails});
  }

  // async editItem(id:string) {
  //   // await db.user.update(id, {title:'prem'})
  // }

  async deleteItem(id:string) {
    await db.user.delete(id);
  }

  async resetDb(){
    await db.resetDatabase()
  }

  itemName = 'My new item';
}
