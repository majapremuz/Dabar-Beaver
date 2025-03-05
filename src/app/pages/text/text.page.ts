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

@Component({
    selector: 'app-text',
    templateUrl: './text.page.html',
    styleUrls: ['./text.page.scss'],
    imports: [IonicModule, CommonModule, CachedImageComponent, BackButtonComponent],
})
export class TextPage implements OnInit {
  content: ContentObject | null = null; 
  categories: Array<ContentObject> = [];
  dataLoad: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private dataCtrl: ControllerService,
    private nativeCtrl: NativeService,
    private router: Router,
    private contentCtrl: DataService,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(async params => {
        const id = parseInt(params.get('id') || '0', 10);
        if (id) {
            await this.loadContent(id);
        }
    });
}

  /*ionViewWillEnter() {
    const id_content = parseInt(this.route.snapshot.paramMap.get('id') || '1', 10);
    this.getData(id_content);
  }*/

    async loadContent(id: number) {
      try {
          this.content = await this.contentCtrl.getContent(id);
          console.log("Loaded content:", this.content);
          this.dataLoad = true;
      } catch (error) {
          console.error("Error fetching content:", error);
      }
  }
}
