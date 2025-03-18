import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisitedLocationPage } from './visited-location.page';

const routes: Routes = [
  {
    path: '',
    component: VisitedLocationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisitedLocationPageRoutingModule {}
