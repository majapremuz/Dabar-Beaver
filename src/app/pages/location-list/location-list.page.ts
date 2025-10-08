import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ContentApiInterface, ContentObject } from 'src/app/model/content';
import { ControllerService } from 'src/app/services/controller.service';
import { GeoPointObject } from 'src/app/model/geo';
import { DataService } from 'src/app/services/data.service';
import { BackButtonComponent } from 'src/app/components/back-button/back-button.component';
import { NagradaBtnComponent } from 'src/app/components/nagrada-btn/nagrada-btn.component';

interface LocationWithGeo {
  name: string;
  geoPoint: GeoPointObject;
}

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.page.html',
  styleUrls: ['./location-list.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, BackButtonComponent, NagradaBtnComponent]  
})
export class LocationListPage implements OnInit {
  locations: LocationWithGeo[] = []; 
  dataLoad: boolean = false;
  translate: any = [];
  categories: Array<ContentObject> = [];
  content: ContentObject | null = null; 

  constructor(
    private router: Router,
    private dataCtrl: ControllerService,
    private contentCtrl: DataService,
  ) {}

  ngOnInit() {
    this.test_data();
  }

  async test_data() {
    try {
      const categories_new = await this.contentCtrl.getCategoryContent(599); 
      console.log("location NEW", categories_new);

      if (categories_new && categories_new.length > 0) {
        this.categories = categories_new;
      }

      this.dataLoad = true;
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  }

  /*showOnMap(location: GeoPointObject) {
    this.router.navigateByUrl('/tekst-lokacije/' + location.getString());
  }*/

  openContent(id: number) {
    this.router.navigateByUrl('/tekst-lokacije/' + id);
  }

  openMap() {
    this.router.navigateByUrl('Potraži dabra na karti');
  }
}
