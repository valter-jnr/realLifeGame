import {
  Component
} from '@angular/core';
import { QuestionsService } from '../questions.service';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-about',
  templateUrl: 'urimTumim.page.html',
  styleUrls: ['urimTumim.page.scss'],
  providers: [QuestionsService, AlertController]

})
export class UrimTumim {

  constructor(public alertController: AlertController) { }

  async playUrimTumin() {
    const alert = await this.alertController.create({
      header: 'Está Escrito ...',
      message: 'Predicao do Urim e Tumin',
      buttons: ['Assim Seja']
    });
    await alert.present();
  }
}



