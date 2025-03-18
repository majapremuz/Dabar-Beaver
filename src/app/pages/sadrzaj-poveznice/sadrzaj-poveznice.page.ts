import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { BackButtonComponent } from 'src/app/components/back-button/back-button.component';
import { CachedImageComponent } from 'src/app/components/cached-image/cached-image.component';
import { ControllerService } from 'src/app/services/controller.service';
import { ContentObject } from 'src/app/model/content';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { NagradaBtnComponent } from 'src/app/components/nagrada-btn/nagrada-btn.component';
@Component({
  selector: 'app-sadrzaj-poveznica',
  templateUrl: './sadrzaj-poveznice.page.html',
  styleUrls: ['./sadrzaj-poveznice.page.scss'],
  imports: [IonicModule, CommonModule, BackButtonComponent, CachedImageComponent, NagradaBtnComponent],
})
export class SadrzajPoveznicePage implements OnInit {
  dataLoad: boolean = false;
    translate: any = [];
    categories: Array<ContentObject> = [];
    content: ContentObject | null = null; 

  constructor(
    private dataCtrl: ControllerService,
    private contentCtrl: DataService,
    private router: Router
  ) { }

  ngOnInit() {
    this.test_data();
  }

async test_data() {
  try {
    const categories_new = await this.contentCtrl.getCategoryContent(606);
    console.log("upoznajte dabrove", categories_new);

    if (categories_new && categories_new.length > 0) {
      this.categories = categories_new;
    }

    this.dataLoad = true;
  } catch (error) {
    console.error("Error fetching content:", error);
  }
}


openContent(id: number) {
  this.router.navigateByUrl('/poveznice/' + id);
}

}
