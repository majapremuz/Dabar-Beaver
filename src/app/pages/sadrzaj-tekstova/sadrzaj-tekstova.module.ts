import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SadrzajTekstovaPageRoutingModule } from './sadrzaj-tekstova-routing.module';

import { SadrzajTekstovaPage } from './sadrzaj-tekstova.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SadrzajTekstovaPageRoutingModule,
    SadrzajTekstovaPage
  ],
  declarations: []
})
export class SadrzajTekstovaPageModule {}
