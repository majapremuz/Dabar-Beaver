import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SadrzajPoveznicePageRoutingModule } from './sadrzaj-poveznice-routing.module';

import { SadrzajPoveznicePage } from './sadrzaj-poveznice.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SadrzajPoveznicePageRoutingModule,
    SadrzajPoveznicePage
  ],
  declarations: []
})
export class SadrzajPoveznicePageModule {}
