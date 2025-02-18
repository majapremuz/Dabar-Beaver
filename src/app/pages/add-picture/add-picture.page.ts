import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';

@Component({
    selector: 'app-add-picture',
    templateUrl: './add-picture.page.html',
    styleUrls: ['./add-picture.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule],
})
export class AddPicturePage {
  imageUrl: string | null = null;
  location = { lat: 0, lng: 0 };

  constructor() {}

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt, // User can choose Camera or Gallery
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
}
