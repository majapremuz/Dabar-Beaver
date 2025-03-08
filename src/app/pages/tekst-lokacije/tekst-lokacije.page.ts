import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ContentApiInterface, ContentObject } from 'src/app/model/content';
import { ControllerService } from 'src/app/services/controller.service';
import { NativeService } from 'src/app/services/native.service';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { CachedImageComponent } from 'src/app/components/cached-image/cached-image.component';
import { BackButtonComponent } from 'src/app/components/back-button/back-button.component';
import { GeoPointObject } from 'src/app/model/geo';

interface LocationWithGeo {
  name: string;
  geoPoint: GeoPointObject;
}

@Component({
  selector: 'app-tekst-lokacije',
  templateUrl: './tekst-lokacije.page.html',
  styleUrls: ['./tekst-lokacije.page.scss'],
  imports: [IonicModule, CommonModule, CachedImageComponent, BackButtonComponent],
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

}
