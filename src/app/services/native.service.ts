import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NativeService {

  constructor(private router: Router) { }

  openInBrowser(url: string){
    window.open(url, '_system', 'location=yes');
   }

   callNumber(number: string){
    return new Promise<Boolean>((res,rej)=>{
      window.open('tel:' + number);
      res(true);
    });
   }

   sendEmail(email: string){
    return new Promise<Boolean>((res,rej)=>{
      window.open('mailto:' + email, '_system');
      res(true);
    });
   }

   async getCurrentPosition() {
    try {
      const coordinates = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true
      });
      return coordinates;
    } catch (error) {
      console.error('Error getting current position:', error);
      throw error;
    }
  }
}
