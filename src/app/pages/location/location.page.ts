import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { GmapsService } from 'src/app/services/gmaps.services';

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class LocationPage implements OnInit {
  @ViewChild('map', { static: true }) mapElementRef!: ElementRef;
  googleMaps: any;
  map: any;
  selectedLocationId!: number;

  constructor(private route: ActivatedRoute, private gmaps: GmapsService) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.selectedLocationId = params['id'];
      this.loadMap();
    });
  }

  async loadMap() {
    this.googleMaps = await this.gmaps.loadGoogleMaps();
    this.map = new this.googleMaps.Map(this.mapElementRef.nativeElement, {
      center: { lat: 46, lng: 16 },
      zoom: 10,
      fullscreenControl: false,
    });

    // Load markers
    this.addMarkers();
  }

  async addMarkers() {
    const locations: { id: number; lat: number; lng: number; name: string }[] = await this.gmaps.loadGoogleMaps();
    
    locations.forEach((location: { id: number; lat: number; lng: number; name: string }) => {
      const marker = new this.googleMaps.Marker({
        position: { lat: location.lat, lng: location.lng },
        map: this.map,
        title: location.name,
      });
  
      if (location.id === this.selectedLocationId) {
        this.map.setCenter({ lat: location.lat, lng: location.lng });
        this.map.setZoom(15);
      }
    });
  }
}  
