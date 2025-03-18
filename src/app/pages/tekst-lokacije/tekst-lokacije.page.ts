import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ContentApiInterface, ContentObject } from 'src/app/model/content';
import { ControllerService } from 'src/app/services/controller.service';
import { NativeService } from 'src/app/services/native.service';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { CachedImageComponent } from 'src/app/components/cached-image/cached-image.component';
import { BackButtonComponent } from 'src/app/components/back-button/back-button.component';
import { GeoPointObject } from 'src/app/model/geo';
import { VisitedLocationsService } from 'src/app/services/visited-locations.service';
import { NagradaBtnComponent } from 'src/app/components/nagrada-btn/nagrada-btn.component';
import { LoadingController } from '@ionic/angular';

interface LocationWithGeo {
  name: string;
  geoPoint: GeoPointObject;
}

@Component({
  selector: 'app-tekst-lokacije',
  templateUrl: './tekst-lokacije.page.html',
  styleUrls: ['./tekst-lokacije.page.scss'],
  imports: [IonicModule, CommonModule, CachedImageComponent, BackButtonComponent, NagradaBtnComponent],
})
export class TekstLokacijePage implements OnInit {
  content: ContentObject | null = null; 
  categories: Array<ContentObject> = [];
  dataLoad: boolean = false;
  //geoPoint: GeoPointObject;
  locations: LocationWithGeo[] = [];
  constructor(
    private route: ActivatedRoute,
    private dataCtrl: ControllerService,
    private nativeCtrl: NativeService,
    private router: Router,
    private contentCtrl: DataService,
    private visitedLocationsService: VisitedLocationsService,
    private toastController: ToastController,
    private loadingController: LoadingController 
  ) { }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!isNaN(id)) {
      this.loadContent(id);
    } else {
      console.error("Invalid content ID");
    }
  }

  async loadContent(id: number) {
    try {
        this.content = await this.contentCtrl.getContent(id);
        console.log("Loaded content:", this.content);

        if (this.content && this.content.content_location) {
            const geoPoint = new GeoPointObject();
            geoPoint.create(this.content.content_location.lat, this.content.content_location.lng);
            this.locations = [{ 
                name: this.content.content_name, 
                geoPoint: geoPoint 
            }];
        }

        this.dataLoad = true;
    } catch (error) {
        console.error("Error fetching content:", error);
    }
}

showOnMap(location: GeoPointObject) {
    this.router.navigateByUrl(`/Lokacije na karti?lat=${location.lat}&lng=${location.lng}`);
}

/*async confirmLocation(location: LocationWithGeo) {
  const loading = await this.loadingController.create({
    message: 'Provjera lokacije...',
    spinner: 'crescent',
    duration: 5000
  });

  await loading.present();

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      await loading.dismiss();
      const userLat = position.coords.latitude;
      const userLng = position.coords.longitude;

      const distance = this.calculateDistance(
        userLat,
        userLng,
        location.geoPoint.lat,
        location.geoPoint.lng
      );

      console.log(`Distance to ${location.name}: ${distance} meters`);

      if (distance <= 50) {
        this.visitedLocationsService.addLocation(location.name);
        // Show success toast
        const toast = await this.toastController.create({
          message: `Lokacija '${location.name}' potvrđena.`,
          duration: 2000,
          color: 'success',
          position: 'middle',
        });
        await toast.present();
      } else {
        // Show failure toast
        const toast = await this.toastController.create({
          message: 'Predaleko ste od lokacije da bi ste potvrdili.',
          duration: 2000,
          color: 'danger',
          position: 'middle',
        });
        await toast.present();
      }
    },
    (error) => {
      console.error("Error getting location:", error);
    }
  );
}*/

async confirmLocation(location: LocationWithGeo) {
  const loading = await this.loadingController.create({
    message: 'Provjera lokacije...',
    spinner: 'crescent',
    duration: 5000
  });

  await loading.present();

  try {
    const position = await this.getCurrentPosition(); // Ensure location retrieval completes
    await loading.dismiss(); // Dismiss loader only after geolocation finishes

    const userLat = position.coords.latitude;
    const userLng = position.coords.longitude;

    const distance = this.calculateDistance(
      userLat,
      userLng,
      location.geoPoint.lat,
      location.geoPoint.lng
    );

    console.log(`Distance to ${location.name}: ${distance} meters`);

    let message = distance <= 50 
      ? `Lokacija '${location.name}' potvrđena.`
      : 'Predaleko ste od lokacije da bi ste potvrdili.';
    let color = distance <= 50 ? 'success' : 'danger';

    if (distance <= 50) {
      this.visitedLocationsService.addLocation(location.name);
    }

    // Show toast after geolocation and loader dismissal
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
      position: 'middle',
    });

    await toast.present();
  } catch (error) {
    console.error("Error getting location:", error);
    await loading.dismiss(); // Ensure loader is dismissed on error

    const toast = await this.toastController.create({
      message: 'Greška pri dohvaćanju lokacije.',
      duration: 2000,
      color: 'danger',
      position: 'middle',
    });

    await toast.present();
  }
}

// Convert getCurrentPosition to Promise-based function
getCurrentPosition(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}


// Haversine formula to calculate distance in meters
calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371000; // Earth's radius in meters
  const toRad = (angle: number) => (angle * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in meters
}


}
