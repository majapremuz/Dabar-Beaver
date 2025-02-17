import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeoPointObject } from 'src/app/model/geo';  // Import GeoPointObject
import { GmapsService } from 'src/app/services/gmaps.services';

@Component({
    selector: 'app-location-list',
    templateUrl: './location-list.page.html',
    styleUrls: ['./location-list.page.scss'],
    standalone: false
})
export class LocationListPage implements OnInit {
  locations: GeoPointObject[] = [];

  constructor(private dataCtrl: GmapsService, private router: Router) {}

  ngOnInit() {
    this.getLocations();
  }

  async getLocations() {
    const rawLocations = await this.dataCtrl.loadGoogleMaps(); // Assuming this gets location data
    this.locations = rawLocations.map((loc: any) => {
      let geoPoint = new GeoPointObject();
      geoPoint.create(loc.lat, loc.lng);
      return geoPoint;
    });
  }

  viewOnMap(location: GeoPointObject) {
    this.router.navigate(['/location'], { 
      queryParams: { lat: location.lat, lng: location.lng } 
    });
  }
}
