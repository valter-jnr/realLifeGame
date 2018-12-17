import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { SqliteDbCopy } from '@ionic-native/sqlite-db-copy/ngx';


@Injectable({
  providedIn: 'root',
})
export class QuestionsService {

constructor(private sqlite: SQLite, private sqliteDbCopy: SqliteDbCopy) { }


public getRandomQuestion(): any {
  const randomInt = this.getRandomInt(0, 3);
  return this.getQuestions()[randomInt];
}

getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}



public getQuestions(): Array<any> {
  const questions = [{
    'question' : 'O que é pentateuco?',
    'answer' : 'it-3 p. 223 / Pentateuco: Esta forma aportuguesada da palavra grega (que significa “cinco rolos” ou'
  },
  {
    'question' : 'Na ordem bíblica, qual é o último livro das escrituras Hebraicas?',
    'answer' : ' Malaquias. índice da Bíblia.'
  },
  {
    'question' : 'Quem disse as seguintes palavras: "é por isso, que retiro o que eu disse, e me arrependo em pó e cinzas"?',
    'answer' : ' ó 42:1-7, Servo fiel Jó'
  },
  {
    'question' : ' Cite 3 elementos que compõem a armadura completa de Deus, conforme a carta de Paulo aos Éfesios.',
    'answer' : ' Efésios 6:13-17, Cinturão da Verdade, Couraça da Justiça, Calçados das Boas Novas, Escudo da'
  }];
return questions;
}

}
