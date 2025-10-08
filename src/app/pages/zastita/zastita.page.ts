import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ContentApiInterface, ContentObject } from 'src/app/model/content';
import { DataService } from 'src/app/services/data.service';
import { BackButtonComponent } from 'src/app/components/back-button/back-button.component';
import { CachedImageComponent } from 'src/app/components/cached-image/cached-image.component';
import { NagradaBtnComponent } from 'src/app/components/nagrada-btn/nagrada-btn.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-zastita',
  templateUrl: './zastita.page.html',
  styleUrls: ['./zastita.page.scss'],
  imports: [IonicModule, CommonModule, BackButtonComponent, CachedImageComponent, NagradaBtnComponent],
})
export class ZastitaPage implements OnInit {
  content: ContentObject | null = null; 
  categories: Array<ContentObject> = [];
  dataLoad: boolean = false;
  constructor(
    private contentCtrl: DataService,
    private router: Router
  ) { }

  ngOnInit() {
    this.test_data();
  }

  async test_data() {
    try {
      let content = await this.contentCtrl.getContent(735);
      console.log("zaštita", content);
      
        this.content = content;
  
      this.dataLoad = true;
    } catch (error) {
      console.error("Error fetching content:", error);
    }
  }

  openMap() {
  this.router.navigateByUrl('Potraži dabra na karti');
}

}
