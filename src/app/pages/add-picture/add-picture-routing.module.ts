import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddPicturePage } from './add-picture.page';

const routes: Routes = [
  {
    path: '',
    component: AddPicturePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddPicturePageRoutingModule {}
