import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VisitedLocationPageRoutingModule } from './visited-location-routing.module';

import { VisitedLocationPage } from './visited-location.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VisitedLocationPageRoutingModule,
    VisitedLocationPage
  ],
  declarations: []
})
export class VisitedLocationPageModule {}
