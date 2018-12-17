import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsPage } from './tabs.page';
import { QuizPage } from '../quiz/quiz.page';
import { UrimTumim } from '../urimTumim/urimTumim.page';
import { ContactPage } from '../contact/contact.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: '',
        redirectTo: '/tabs/(quiz:quiz)',
        pathMatch: 'full',
      },
      {
        path: 'quiz',
        outlet: 'quiz',
        component: QuizPage
      },
      {
        path: 'urimTumim',
        outlet: 'urimTumim',
        component: UrimTumim
      },
      {
        path: 'contact',
        outlet: 'contact',
        component: ContactPage
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/(quiz:quiz)',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
