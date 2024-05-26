import Dexie, { Table } from 'dexie';
import { LoginApiResponse } from '../app/authentication/auth.interface';

export interface Users {
  id?: string;
  user?: LoginApiResponse
}

export class AppDB extends Dexie {
  user!: Table<Users, string>;

  constructor() {
    super('ngdexieliveQuery');
    this.initilizeDb()
  }

  async initilizeDb() {
    await this.version(3).stores({
      user: '++id',
    });
    this.on('populate', () => "");
  }

  async resetDatabase() {
    await db.transaction('rw', 'user', () => {
      this.user.clear();
    });
  }

  async populate(user?: any) {
    await db.user.add({
      user: user
    });
    console.log(user)
  }
}

export const db = new AppDB();
