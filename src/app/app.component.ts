import { Component, ViewChild } from '@angular/core';
import { IonRouterOutlet, Platform } from '@ionic/angular';
import { TranslateConfigService } from './services/translate-config.service';
import { ControllerService } from './services/controller.service';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Router } from '@angular/router';
import { App } from '@capacitor/app';
import { ContentApiInterface, ContentObject } from 'src/app/model/content';
import { DataService } from 'src/app/services/data.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
    standalone: false
})
export class AppComponent {
  dataLoad: boolean = false;
  categories: Array<ContentObject> = [];

  @ViewChild(IonRouterOutlet, { static: false }) routerOutlet: IonRouterOutlet | undefined;
  
  constructor(
    private router: Router,
    public platform: Platform,
    public translateConfigService: TranslateConfigService,
    public dataCtrl: ControllerService,
    private contentCtrl: DataService,
  ) {
    this.initApp();
  }

  ngOnInit() {
    this.test_data();
  }

  async initApp(){
    await this.platform.ready();

    // define android exit app (whet user press back)
    this.platform.backButton.subscribeWithPriority(11, () => {

      if(this.routerOutlet != undefined){
        // ako vise nejde undo
        if (!this.routerOutlet.canGoBack()) {
          // ako je otvorena home stranica
          // onda iskljuci aplikaciju
          if(this.dataCtrl.getHomePageStatus() == true){
            App.exitApp();
          }
          else{
            this.router.navigateByUrl('/home');
          }
        }
        else{
          this.routerOutlet.pop();
        }
      }

    });

    this.translateConfigService.getDefaultLanguage();

    // provjera login
    // kreiranje ionic storage
    await this.dataCtrl.initFunc();

    this.setReadyPage();
  }

  async setReadyPage(){
    // nakon sto se stranica pokrene ugasiti splash screen
    if(this.platform.is('cordova') || this.platform.is('capacitor')){
      await SplashScreen.hide();
      await StatusBar.show();

      // crna slova na statusbaru
      //await StatusBar.setStyle({ style: Style.Light });

      // pokreni inicijalizaciju notifikacija
      // await this.initNotifications();
    }

    // izvrisit sve provjere i funkcije prije ove funkcije
    // jer tek kad se pokrene ova funkcija dozvoljava se 
    // pokretanje prve stranice
    this.dataCtrl.setReadyPage();
  }

  async test_data(){
    // sa pvpm funkcijom dobivas sve root kategorije koje ti idu na home page
    // ovu funkciju ces imati samo na home page
    let categories = await this.contentCtrl.getRootContent();
    this.categories = categories;
    console.log("MENU CATEGORIES", this.categories); // Check if categories are being loaded correctly

    // kad pojedinu kategoriju otvoris onda dobivas njezine kategorije i tekstove
    // sa ovom funkcijom samo prosljedis id od nje u funkciju
    // 601 je ovdje samo za primjer
    let categories_new = await this.contentCtrl.getCategoryContent(601); 

    // uzima samo odredeni content prema idju
    // to je kad na primjer udes u neku stranicu
    let content = await this.contentCtrl.getContent(601);

    console.log(content);
    /* 
    
    probaj slike koje dolaze sa servera stavljati sa
    ovim tagom jer pn kesira slike i bude aplikacija radila brze
    <app-cached-image [src]="url_example"></app-cached-image>
    
    
    */
    this.dataLoad = true;

  }


  openCategory(categoryName: string) {
    const encodedCategory = encodeURIComponent(categoryName);
    this.router.navigateByUrl(encodedCategory);
}

}
