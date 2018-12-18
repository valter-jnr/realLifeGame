import { Component, OnInit } from '@angular/core';
import {QuestionsService} from '../questions.service';
import { AlertController, Platform } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { SqliteDbCopy } from '@ionic-native/sqlite-db-copy/ngx';
import { SqliteService } from '../shared/sqlite.service';

@Component({
  selector: 'app-quiz',
  templateUrl: 'quiz.page.html',
  styleUrls: ['quiz.page.scss'],
  providers: [QuestionsService, SqliteDbCopy, SQLite,SqliteService],
})
export class QuizPage implements OnInit{

  private novaPergunta: boolean;
  private question: string;
  private answer: string;
  private db: SQLiteObject;
  private database = 'dblite';

  constructor(public plt: Platform, private sqlite: SQLite, private sqliteDbCopy: SqliteDbCopy,
     private questionsService: QuestionsService, public alertController: AlertController,
      private sqliteService:SqliteService) {

      this.plt.ready().then((readySource) => {
        console.log('Platform ready from');
        sqliteService.initializeDatabase();
        })
        .catch((error: any) => this.question = JSON.stringify(error));
  }

  ngOnInit(): void {
    this.setNovaPergunta(true);
  }

  public startGame() {
      this.setNovaPergunta(false);
      this.getRamdomQuestion(this.questionsService.getRandomInt(1, 524));
  }

  async initializeDatabase(): Promise<any> {
    this.copyDatabase(this.database)
      .catch(e  =>   {
        this.answer = JSON.stringify(e);
        this.removeDatabase('dblite')
        .then(() => this.initializeDatabase())
        .catch((error: any) => this.question = JSON.stringify(error)); })
      
      .then(
        () =>
                this.sqlite.create({
                      name: 'dblite' ,
                      location: 'default'
                    }).then(base => {
                      this.db = base;
                    })
    )
    .catch((error: any) => this.question = JSON.stringify(error));;
  }


  public getQuestion(){
    const quiz = this.questionsService.getRandomQuestion();
    this.answer = quiz.answer;
    this.question = quiz.question;
  }

  setNovaPergunta(value: boolean){
    this.novaPergunta = value;
  }

  async displayAnswer() {
    const alert = await this.alertController.create({
      header: 'Resposta',
      message: this.answer,
      buttons: [
        {
          text: 'Errou',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Acertou',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
    this.setNovaPergunta(true);
  }

  copyDatabase(database: string): Promise<any> {
    return this.sqliteDbCopy.copy('dblite', 0);
  }
   createDatabase(database: string): Promise<any>{
    return this.sqlite.create({
      name: 'dblite' ,
      location: 'default'
    }) ;
  }
   removeDatabase(database: string): Promise<any>{
    return this.sqliteDbCopy.remove(  'dblite' , 0);
  }
  async getRamdomQuestion(index: number): Promise<any> {
    const query = `select * from quiz where rowid = ${index} limit 1` ;
    const rs = await this.sqliteService.query(query);
    this.question = rs.rows.item(0).question;
    this.answer = rs.rows.item(0).answer;
  }



}
