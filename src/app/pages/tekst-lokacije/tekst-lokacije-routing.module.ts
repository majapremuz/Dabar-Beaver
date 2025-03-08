import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TekstLokacijePage } from './tekst-lokacije.page';

const routes: Routes = [
  {
    path: '',
    component: TekstLokacijePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TekstLokacijePageRoutingModule {}
