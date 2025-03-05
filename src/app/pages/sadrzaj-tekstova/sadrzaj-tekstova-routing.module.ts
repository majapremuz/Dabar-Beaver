import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SadrzajTekstovaPage } from './sadrzaj-tekstova.page';

const routes: Routes = [
  {
    path: '',
    component: SadrzajTekstovaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SadrzajTekstovaPageRoutingModule {}
