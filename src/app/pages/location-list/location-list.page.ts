import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { ContentApiInterface, ContentObject } from 'src/app/model/content';
import { ControllerService } from 'src/app/services/controller.service';
import { GeoPointObject } from 'src/app/model/geo';  // Import GeoPointObject;
import { GmapsService } from 'src/app/services/gmaps.services';
import { DataService } from 'src/app/services/data.service';
import { FooterComponent } from 'src/app/components/footer/footer.component';

@Component({
    selector: 'app-location-list',
    templateUrl: './location-list.page.html',
    styleUrls: ['./location-list.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, FooterComponent]
})
export class LocationListPage implements OnInit {
  locations: GeoPointObject[] = [];
  categories: Array<ContentObject> = [];
  content: ContentObject | null = null;
  dataLoad: boolean = false;

  constructor(
    private router: Router,
    private dataCtrl: ControllerService,
    private contentCtrl: DataService,
  ) {}

  ngOnInit() {
    //this.getLocations();
    this.test_data();
  }

  async test_data(){
    try {
        let contentData = await this.contentCtrl.getContent(603);
        console.log("DATA: ", contentData);
        
        if (contentData) {
          this.content = contentData; 
        }

        this.dataLoad = true;
    } catch (error) {
        console.error("Error fetching content:", error);
    }
}


  /*async getLocations() {
    const rawLocations = await this.dataCtrl.loadGoogleMaps(); // Assuming this gets location data
    this.locations = rawLocations.map((loc: any) => {
      let geoPoint = new GeoPointObject();
      geoPoint.create(loc.lat, loc.lng);
      return geoPoint;
    });
  }*/

  viewOnMap(location: GeoPointObject) {
    this.router.navigate(['/location'], { 
      queryParams: { lat: location.lat, lng: location.lng } 
    });
  }
}
