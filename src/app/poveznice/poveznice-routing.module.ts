import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PoveznicePage } from './poveznice.page';

const routes: Routes = [
  {
    path: '',
    component: PoveznicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PoveznicePageRoutingModule {}
