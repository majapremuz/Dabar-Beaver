import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ContentApiInterface, ContentObject } from 'src/app/model/content';
import { ControllerService } from 'src/app/services/controller.service';
import { NativeService } from 'src/app/services/native.service';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';  
import { BackButtonComponent } from 'src/app/components/back-button/back-button.component';


@Component({
    selector: 'app-poveznice',
    templateUrl: './poveznice.page.html',
    styleUrls: ['./poveznice.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, BackButtonComponent]
})
export class PoveznicePage implements OnInit {
  content: ContentObject[] = [];
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

async loadContent(id: number) {
  try {
      const fetchedContent = await this.contentCtrl.getContent(id);
      this.content = fetchedContent ? [fetchedContent] : []; // Wrap in an array
      console.log("Loaded content:", this.content);
      this.dataLoad = true;
  } catch (error) {
      console.error("Error fetching content:", error);
  }
}

  
  // Function to extract links from text
  extractLinks(text: string): string[] {
      if (!text) return [];
      const urlRegex = /(https?:\/\/[^\s]+)/g;
      return text.match(urlRegex) || [];
  }
  
  openLink(url: string) {
    window.open(url, '_blank');
}
  
}
