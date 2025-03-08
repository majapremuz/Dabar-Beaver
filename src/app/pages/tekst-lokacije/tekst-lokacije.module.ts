import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TekstLokacijePageRoutingModule } from './tekst-lokacije-routing.module';

import { TekstLokacijePage } from './tekst-lokacije.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TekstLokacijePageRoutingModule,
    TekstLokacijePage
  ],
  declarations: []
})
export class TekstLokacijePageModule {}
