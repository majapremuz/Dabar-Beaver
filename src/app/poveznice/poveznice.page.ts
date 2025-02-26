import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ContentApiInterface, ContentObject } from 'src/app/model/content';
import { ControllerService } from 'src/app/services/controller.service';
import { NativeService } from 'src/app/services/native.service';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { FooterComponent } from '../components/footer/footer.component';  
import { CachedImageComponent } from '../components/cached-image/cached-image.component';


@Component({
    selector: 'app-poveznice',
    templateUrl: './poveznice.page.html',
    styleUrls: ['./poveznice.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, FooterComponent, CachedImageComponent]
})
export class PoveznicePage implements OnInit {
  content: ContentObject | null = null; 
  dataLoad: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private dataCtrl: ControllerService,
    private nativeCtrl: NativeService,
    private router: Router,
    private contentCtrl: DataService,
  ) { }

  ngOnInit() {
    this.test_data();
  }

  /*ionViewWillEnter() {
    const id_content = parseInt(this.route.snapshot.paramMap.get('id') || '1', 10);
    this.getData(id_content);
  }*/

  async test_data(){
    try {
        let contentData = await this.contentCtrl.getContent(607);
        console.log("DATA: ", contentData);
        
        if (contentData) {
          this.content = contentData;
        }

        this.dataLoad = true;
    } catch (error) {
        console.error("Error fetching content:", error);
    }
}
  
}
