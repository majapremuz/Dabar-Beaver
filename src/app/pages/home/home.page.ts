import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ContentApiInterface, ContentObject } from 'src/app/model/content';
import { ControllerService } from 'src/app/services/controller.service';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { NagradaBtnComponent } from 'src/app/components/nagrada-btn/nagrada-btn.component';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, NagradaBtnComponent]
})
export class HomePage {
  dataLoad: boolean = false;
  translate: any = [];
  categories: Array<ContentObject> = [];
  contents: Array<ContentObject> = [];

  constructor(
    private dataCtrl: ControllerService,
    private router: Router,
    private contentCtrl: DataService,
  ) {
    this.initTranslate();
  }

  // ovo je za content
  async test_data(){
    // sa pvpm funkcijom dobivas sve root kategorije koje ti idu na home page
    // ovu funkciju ces imati samo na home page
    let categories = await this.contentCtrl.getRootContent();
    console.log("MENU CATEGORIES", categories);
    this.categories = categories;
    // kad pojedinu kategoriju otvoris onda dobivas njezine kategorije i tekstove
    // sa ovom funkcijom samo prosljedis id od nje u funkciju
    // 601 je ovdje samo za primjer
    let categories_new = await this.contentCtrl.getCategoryContent(603); 

    // uzima samo odredeni content prema idju
    // to je kad na primjer udes u neku stranicu
    let content = await this.contentCtrl.getContent(603);

    console.log("DATA home: ", content);
    /* 
    
    probaj slike koje dolaze sa servera stavljati sa
    ovim tagom jer pn kesira slike i bude aplikacija radila brze
    <app-cached-image [src]="url_example"></app-cached-image>
    
    
    */
    this.dataLoad = true;

  }  


  ionViewWillEnter(){
    this.dataCtrl.setHomePage(true);
    this.test_data();
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
      console.log("DATA home: ", data)
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

      console.log("CONTENTS: ", this.contents);

    }

  }

  openCategory(categoryName: string) {
    const encodedCategory = encodeURIComponent(categoryName);
    this.router.navigateByUrl(encodedCategory);
}



  async initTranslate(){
    this.translate['test_string'] = await this.dataCtrl.translateWord("TEST.STRING");
  }

}
