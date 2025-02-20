import { Injectable } from '@angular/core';
import { ControllerService } from './controller.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionnaireService {

  url: string = '/api/questionnaire/questionnaire_public';
  questionnaire: Array<any> = [];
  content_signature: string = '';

  constructor(
      private apiCtrl: ControllerService 
  ) {
    this.getContent();
  }

    private async checkCache(){
      let url: string = this.url;
      // first check cache
      let cachedData = await this.apiCtrl.checkCache(environment.cache_key + url, null).catch(err => {return undefined;});
  
      if(cachedData != undefined && cachedData?.status == true && cachedData?.message == 'success'){
        if(cachedData?.signature != this.content_signature){
          // new data
          this.questionnaire = [];
          cachedData['data'].map((item:any) => {
            //let object_content = new ContentObject(item);
            this.questionnaire.push(item);
          });
          this.content_signature = cachedData?.signature;
          console.log('new fresh data from cache');
        }else{
          // do nothing because data is same like before
        }
        return true;
      }else{
        return false;
      }
    }
  
    private async checkServer(){
      let url: string = this.url;
      let cache_time:number;
      if(environment.production) {
        cache_time = 60*60*6; // 6 hours
      }else{
        cache_time = 5; // 5sec
      }
      let response = await this.apiCtrl.getServer(url, true, cache_time).catch(err => {
        return undefined;
      });
  
      if(response != undefined && response?.['message'] == 'success'){
        if(response['signature'] != this.content_signature){
          // new data
          this.questionnaire = [];
          response['data'].map((item:any) => {
            //let object_content = new ContentObject(item);
            this.questionnaire.push(item);
          });
          this.content_signature = response['signature'];
          console.log('get new data dfrom server');
        }else{
          // do nothing because data is same like before
        }
        return true;
      }else{
        return false;
      }
    }
  
    private async getContent(){
      let server: boolean = false;
      let cache: boolean = await this.checkCache();
      if(!cache) server = await this.checkServer();
      else this.checkServer();
      return (server || cache);
    }

    async getQuestionnaire(){
      await this.getContent();

      return this.questionnaire;
    }

    async getQuestions(id: number){
      let all_questions: Array<any> = [];
      await this.getContent();

      let item = this.questionnaire.find(item => item.questionnaire_id == id);

      item.questionnaire_questions_obj.map((group:any) => {
        group['questions'].map((question: any) => {
          all_questions.push(question);
        });
      });


      all_questions.sort((a, b) => {
        if(a.questionnaire_question_id > b.questionnaire_question_id) return 1;
        if(a.questionnaire_question_id < b.questionnaire_question_id) return -1;
        return 0;
      });

      return all_questions;
    }

    async getAnswers(questionnaire_id: number, question_id: number){
      await this.getContent();

      let questions = await this.getQuestions(questionnaire_id);
      let item = questions.find(item => item.questionnaire_question_id == question_id);

      return item.answers;
    }
}
