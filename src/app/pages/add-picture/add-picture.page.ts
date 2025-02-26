import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { FooterComponent } from 'src/app/components/footer/footer.component';

@Component({
    selector: 'app-add-picture',
    templateUrl: './add-picture.page.html',
    styleUrls: ['./add-picture.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule, FooterComponent],
})
export class AddPicturePage {
  imageUrl: string | null = null;
  location = { lat: 0, lng: 0 };
  locationName: string = '';
  GOOGLE_API_KEY = environment.google_map_api;


  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt,
    });

    this.imageUrl = image.dataUrl!;
  }

  async getLocation() {
    const coordinates = await Geolocation.getCurrentPosition();
    this.location = {
      lat: coordinates.coords.latitude,
      lng: coordinates.coords.longitude,
    };
  }

  async getCurrentLocation() {
    const coordinates = await Geolocation.getCurrentPosition();
    this.location = {
      lat: coordinates.coords.latitude,
      lng: coordinates.coords.longitude,
    };
    this.navigateToMap(this.location.lat, this.location.lng);
  }

  searchLocation() {
    if (!this.locationName.trim()) return;

    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(this.locationName)}&key=${this.GOOGLE_API_KEY}`;

    this.http.get<any>(url).subscribe(response => {
      if (response.status === 'OK') {
        const place = response.results[0].geometry.location;
        this.navigateToMap(place.lat, place.lng);
      } else {
        alert('Location not found!');
      }
    }, error => {
      console.error('Error fetching location:', error);
    });
  }

  navigateToMap(lat: number, lng: number) {
    console.log('Navigating to:', lat, lng);
    this.router.navigate(['/Lokacije na karti'], { 
      queryParams: { lat, lng }
    });
  }

}
