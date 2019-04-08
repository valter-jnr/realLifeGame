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
  providers: [QuestionsService],
})
export class QuizPage implements OnInit{

  private novaPergunta: boolean;
  private question: string;
  private answer: string;
  private showAnswer:boolean;
  private db: SQLiteObject;
  private database = 'dblite';

  constructor(public plt: Platform,private questionsService: QuestionsService,
     public alertController: AlertController, private sqliteService:SqliteService) {

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

  public getQuestion(){
    const quiz = this.questionsService.getRandomQuestion();
    this.answer = quiz.answer;
    this.question = quiz.question;
  }

  setNovaPergunta(value: boolean){
    this.novaPergunta = value;
  }

  async displayAnswer() {
    this.showAnswer = true;
    
  }

  async getRamdomQuestion(index: number): Promise<any> {
    const query = `select * from quiz where rowid = ${index} limit 1` ;
    const rs = await this.sqliteService.query(query);
    this.question = rs.rows.item(0).question;
    this.answer = rs.rows.item(0).answer;
  }

  wrongAnswer(){
    console.log(this.answer)
    this.setNovaPergunta(true);
    this.showAnswer = false;
  }

  rightAnswer(){
    console.log(this.answer)
    this.setNovaPergunta(true);
    this.showAnswer = false;
  }



}
