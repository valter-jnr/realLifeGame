import {
  Component
} from '@angular/core';
import { QuestionsService } from '../questions.service';
import { AlertController } from '@ionic/angular';
import { SqliteService } from '../shared/sqlite.service';


@Component({
  selector: 'app-about',
  templateUrl: 'urimTumim.page.html',
  styleUrls: ['urimTumim.page.scss'],
  providers: [QuestionsService, AlertController]

})
export class UrimTumim {

  prediction: string; 

  constructor(public alertController: AlertController, private sqliteService:SqliteService , private questionsService: QuestionsService) { }

  async playUrimTumin(){
    const index = this.questionsService.getRandomInt(1, 524);
    const query  = `select predictions from urimTumin where rowid = ${index} limit 1;`;
    const rs = await this.sqliteService.query(query);
    this.prediction = rs.rows.item(0).predictions;
    alert(this.prediction);
    this.displayUrimTumin();
  }
  

  async displayUrimTumin() {
    const alert = await this.alertController.create({
      header: 'Está Escrito ...',
      message: this.prediction,
      buttons: ['Assim Seja']
    });
    await alert.present();
  }
}



