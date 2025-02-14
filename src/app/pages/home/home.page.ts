import { Component } from '@angular/core';
import { ContentApiInterface, ContentObject } from 'src/app/model/content';
import { ControllerService } from 'src/app/services/controller.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  translate: any = [];

  contents: Array<ContentObject> = [];

  constructor(
    private dataCtrl: ControllerService,
    private router: Router
  ) {
    this.initTranslate();
  }


  ionViewWillEnter(){
    this.dataCtrl.setHomePage(true);
    // do something when in moment home page opens
  }

  ionViewWillLeave(){
    this.dataCtrl.setHomePage(false);
  }

  /**
   * This funcion get content from API node
   */
  async test(){

      /**
   
      API nodes

      /api/content/newest_contents_offline
      - get the newest content

      /api/content/contents_main_group_offline/
      - get main categories of the contents

      /api/content/contents_all_group_offline/
      - get all categories of the contents

      /api/content/contents_offline/?id=xxx&page_size=xxx&page=xxx
      - get all contents from categorory

      /api/content/content_offline/?id=xxx
      - get content details

      */


    let url = '/api/content/contents_main_group_offline';

    // show loader
    await this.dataCtrl.showLoader();

    // get data from server
    let data = await this.dataCtrl.getServer(url, true, 20).catch(err => {
      this.dataCtrl.parseErrorMessage(err).then(message => {
        this.dataCtrl.showToast(message.message, message.type);

        if(message.title == 'server_error'){
          // take some action e.g logout, change page
        }
      });
      return undefined;
    });

    // hide loader
    await this.dataCtrl.hideLoader();


    if(data != undefined){
      console.log('data is loaded', data.data);

      data.data.map((item: ContentApiInterface) => {
        this.contents.push(new ContentObject(item));
      });

      console.log(this.contents);

    }

  }

  openLocationPage() {
    this.router.navigate(['location']);
  }

  openQuizPage() {
    this.router.navigate(['quiz']);
  }

  async initTranslate(){
    this.translate['test_string'] = await this.dataCtrl.translateWord("TEST.STRING");
  }

}
