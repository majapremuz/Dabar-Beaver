import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ContentApiInterface, ContentObject } from 'src/app/model/content';
import { ControllerService } from 'src/app/services/controller.service';
import { GeoPointObject } from 'src/app/model/geo';  // Import GeoPointObject
import { DataService } from 'src/app/services/data.service';
import { BackButtonComponent } from 'src/app/components/back-button/back-button.component';

interface LocationWithGeo {
  name: string;
  geoPoint: GeoPointObject;
}

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.page.html',
  styleUrls: ['./location-list.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, BackButtonComponent]
})
export class LocationListPage implements OnInit {
  locations: LocationWithGeo[] = [];  // Use the new interface
  content!: ContentObject;
  dataLoad: boolean = false;

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

      this.locations = categories_new.map(category => {
        const geoPoint = new GeoPointObject();
        geoPoint.create(category.content_location.lat, category.content_location.lng);
        
        // Return an object that contains both the name and geoPoint
        return {
          name: category.content_name,
          geoPoint: geoPoint
        };
      });

      this.dataLoad = true;
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  }

  showOnMap(location: GeoPointObject) {
    this.router.navigateByUrl('/Lokacije na karti/' + location.getString());
  }
}
