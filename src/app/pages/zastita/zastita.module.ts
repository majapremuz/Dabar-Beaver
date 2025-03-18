import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ZastitaPageRoutingModule } from './zastita-routing.module';

import { ZastitaPage } from './zastita.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ZastitaPageRoutingModule,
    ZastitaPage
  ],
  declarations: []
})
export class ZastitaPageModule {}
