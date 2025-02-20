import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ContentApiInterface, ContentObject } from 'src/app/model/content';
import { ControllerService } from 'src/app/services/controller.service';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { QuestionnaireService } from 'src/app/services/questionnaire.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
    standalone: true,
    imports: [IonicModule]
})
export class HomePage {

  translate: any = [];

  contents: Array<ContentObject> = [];

  constructor(
    private dataCtrl: ControllerService,
    private router: Router,
    private contentCtrl: DataService,
    private questionCtrl: QuestionnaireService
  ) {
    this.initTranslate();
  }

  // ovo je za content
  async test_data_2(){
    // sa pvpm funkcijom dobivas sve root kategorije koje ti idu na home page
    // ovu funkciju ces imati samo na home page
    let categories = await this.contentCtrl.getRootContent();

    // kad pojedinu kategoriju otvoris onda dobivas njezine kategorije i tekstove
    // sa ovom funkcijom samo prosljedis id od nje u funkciju
    // 601 je ovdje samo za primjer
    let categories_new = await this.contentCtrl.getCategoryContent(601); 

    /* 
    
    probaj slike koje dolaze sa servera stavljati sa
    ovim tagom jer pn kesira slike i bude aplikacija radila brze
    <app-cached-image [src]="url_example"></app-cached-image>
    
    
    */

  }

  // ovo je za kvizove
  async test_data(){
    // dohvaca sve kvizove dostupne
    let questionnaire = await this.questionCtrl.getQuestionnaire();

    // uzimas id od prvog kviza jer tebi treba samo jedan
    let first_questionnaire_id = questionnaire[0].questionnaire_id;

    // uzimas sva pitanja od prvog kviza
    // pitanja imaju polje questionnaire_question_text - to je tekst pitanja
    let questions = await this.questionCtrl.getQuestions(first_questionnaire_id);

    // uzimas odgovore od kviza i pitanja id -> 2 - to je primjer ti ces stavviti id od pitanja iz petlje
    // odgovori imaju dva vazna polja
    // questionnaire_answer_text - text koji pise na tipki za odgovor
    // questionnaire_answer_correct moze biti 'Y' ili 'N' a oznacava ako je odgovor tocan ili ne
    let answers = await this.questionCtrl.getAnswers(first_questionnaire_id,2);

    console.log(questions);
    console.log(answers);


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

  openLocationListPage() {
    this.router.navigate(['location-list']);
  }

  openQuizPage() {
    this.router.navigate(['quiz']);
  }

  openAddPicturePage() {
    this.router.navigate(['add-picture']);
  }

  openTextPage() {
    this.router.navigate(['text']);
  }

  async initTranslate(){
    this.translate['test_string'] = await this.dataCtrl.translateWord("TEST.STRING");
  }

}
