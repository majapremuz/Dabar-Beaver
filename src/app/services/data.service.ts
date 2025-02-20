import { Injectable } from '@angular/core';
import { ControllerService } from './controller.service';
import { ContentObject } from '../model/content';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  url: string = '/api/content/structure';
  content: Array<ContentObject> = [];
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
        this.content = [];
        cachedData.data['data'].map((item:any) => {
          let object_content = new ContentObject(item);
          this.content.push(object_content);
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
        this.content = [];
        response.data['data'].map((item:any) => {
          let object_content = new ContentObject(item);
          this.content.push(object_content);
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

  async getRootContent(){
    await this.getContent();

    let categories = this.content.filter(item => (item.content_parent == null));

    categories.sort((a, b) => {
      if(a.content_order > b.content_order) return 1;
      if(a.content_order < b.content_order) return -1;
      return 0;
    });

    return categories;
  }

  async getCategoryContent(id: number){
    await this.getContent();

    let categories = this.content.filter(item => item.content_parent_id != null && item.content_parent_id == id);

    categories.sort((a, b) => {
      if(a.content_order > b.content_order) return 1;
      if(a.content_order < b.content_order) return -1;
      return 0;
    });

    return categories;
  }



}
