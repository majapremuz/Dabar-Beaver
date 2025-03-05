import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SadrzajPoveznicePage } from './sadrzaj-poveznice.page';

const routes: Routes = [
  {
    path: '',
    component: SadrzajPoveznicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SadrzajPoveznicePageRoutingModule {}
