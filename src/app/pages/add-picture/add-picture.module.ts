import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddPicturePageRoutingModule } from './add-picture-routing.module';

import { AddPicturePage } from './add-picture.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddPicturePageRoutingModule,
    AddPicturePage
  ],
  declarations: []
})
export class AddPicturePageModule {}
