import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { SqliteDbCopy } from '@ionic-native/sqlite-db-copy/ngx';

@Injectable({
  providedIn: 'root'
})
export class SqliteService {

  private db: SQLiteObject;
  private database = 'dblite';

  constructor(private sqlite: SQLite, private sqliteDbCopy: SqliteDbCopy, private storage: Storage) { }

  async initializeDatabase(): Promise<any> {
    this.copyDatabase(this.database)
      .catch(e => {
        this.removeDatabase('dblite')
          .then(() => this.initializeDatabase());
      })
      .then(
        () =>
          this.sqlite.create({
            name: 'dblite',
            location: 'default'
          }).then(base => {
            this.db = base;
          })
      );
  }


  copyDatabase(database: string): Promise<any> {
    return this.sqliteDbCopy.copy('dblite', 0);
  }
  createDatabase(database: string): Promise<any> {
    return this.sqlite.create({
      name: 'dblite',
      location: 'default'
    });
  }
  removeDatabase(database: string): Promise<any> {
    return this.sqliteDbCopy.remove('dblite', 0);
  }

   query(query:string): Promise<any> {
    return  this.db.executeSql(query,[]);
  }

}
