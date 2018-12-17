import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs.router.module';

import { TabsPage } from './tabs.page';
import { ContactPageModule } from '../contact/contact.module';
import { UrimTumimModule } from '../urimTumim/urimTumim.module';
import { QuizPageModule } from '../quiz/quiz.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    QuizPageModule,
    UrimTumimModule,
    ContactPageModule
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
