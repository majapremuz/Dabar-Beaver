import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PoveznicePageRoutingModule } from './poveznice-routing.module';

import { PoveznicePage } from './poveznice.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PoveznicePageRoutingModule,
    PoveznicePage
  ],
  declarations: []
})
export class PoveznicePageModule {}
