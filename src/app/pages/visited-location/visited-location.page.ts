import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ContentApiInterface, ContentObject } from 'src/app/model/content';
import { DataService } from 'src/app/services/data.service';
import { GeoPointObject } from 'src/app/model/geo';
import { BackButtonComponent } from 'src/app/components/back-button/back-button.component';
import { VisitedLocationsService } from 'src/app/services/visited-locations.service';
import { NagradaBtnComponent } from 'src/app/components/nagrada-btn/nagrada-btn.component';
interface LocationWithGeo {
  name: string;
  geoPoint: GeoPointObject;
}

@Component({
  selector: 'app-visited-location',
  templateUrl: './visited-location.page.html',
  styleUrls: ['./visited-location.page.scss'],
  imports: [IonicModule, CommonModule, BackButtonComponent, NagradaBtnComponent],
})
export class VisitedLocationPage implements OnInit {
  categories: Array<ContentObject> = [];
  locations: LocationWithGeo[] = []; 
  dataLoad: boolean = false;
  visitedLocations: string[] = [];

  constructor(
    private contentCtrl: DataService,
    private visitedLocationsService: VisitedLocationsService,
  ) { }

  ngOnInit() {
    this.visitedLocations = this.visitedLocationsService.getLocations();
    this.test_data();
  }

  async test_data() {
    try {
      const categories_new = await this.contentCtrl.getCategoryContent(599);
      console.log("location NEW", categories_new);
  
      if (categories_new && categories_new.length > 0) {
        this.categories = categories_new;
        //this.locations = categories_new;
      }
  
      this.dataLoad = true;
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  }
  

}
