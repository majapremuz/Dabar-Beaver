import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ContentApiInterface, ContentObject } from 'src/app/model/content';
import { ControllerService } from 'src/app/services/controller.service';
import { NativeService } from 'src/app/services/native.service';
import { environment } from 'src/environments/environment';
import { ImageObject } from '../../model/image';
import { Router } from '@angular/router';


@Component({
    selector: 'app-text',
    templateUrl: './text.page.html',
    styleUrls: ['./text.page.scss'],
    imports: [IonicModule, CommonModule]
})
export class TextPage implements OnInit {

  content!: ContentObject;
  dataLoad: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private dataCtrl: ControllerService,
    private nativeCtrl: NativeService,
    private router: Router
  ) { }

  ngOnInit() {
    //
  }

  ionViewWillEnter() {
    const id_content = parseInt(this.route.snapshot.paramMap.get('id') || '1', 10);
    this.getData(id_content);
  }

  async getData(id: number) {
    const url_category = '/api/content/content_offline/?id=' + id;

    // show loader
    await this.dataCtrl.showLoader();

    try {
      // get data from server
      const article_data = await this.dataCtrl.getServer(url_category, true, 20);

      console.log("Raw Article Data:", article_data);

      if (article_data && article_data.data) {
        this.content = new ContentObject(article_data.data);
        console.log(this.content);

        // Remove HTML tags from segment descriptions
      this.content.segments.forEach(segment => {
        segment.segment_description = this.removeHtmlTags(segment.segment_description);
      })
    
      } else {
        console.error("No data received or data format incorrect");
      }
      
    } catch (err: any) {
      console.error("Error fetching data:", err.message, err.stack); // More detailed error logging

      this.dataCtrl.parseErrorMessage(err).then(message => {
        this.dataCtrl.showToast(message.message, message.type);
        if (message.title == 'server_error') {
          // take some action e.g logout, change page
        }
      });
    } finally {
      this.dataLoad = true;
      // hide loader
      await this.dataCtrl.hideLoader();
    }
  }
    removeHtmlTags(input: string): string {
      return input.replace(/<\/?[^>]+(>|$)/g, "");
}

openAttachment(item: ImageObject){
  let url = '';
  if(item.image == true){
    url = environment.rest_server.protokol + environment.rest_server.host + '/Assets/multimedia/original/' + item.full_url;
  }else{
    url = environment.rest_server.protokol + environment.rest_server.host + '/Assets/multimedia/' + item.multimedia_file;
  }

  this.nativeCtrl.openInBrowser(url);
}

showOnMap(markerId: number) {
  this.router.navigateByUrl('/location/' + markerId);
  //this.router.navigate(['/location', { markerId }]);
}
  
}
