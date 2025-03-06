import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { BackButtonComponent } from 'src/app/components/back-button/back-button.component';
import { ActionSheetController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-add-picture',
  templateUrl: './add-picture.page.html',
  styleUrls: ['./add-picture.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, BackButtonComponent],
})
export class AddPicturePage {
  input_text: string = '';
  base64: string | null = null;
  imageLoad: boolean = false;
  location = { lat: 0, lng: 0 };
  GOOGLE_API_KEY = environment.google_map_api;
  nativeCtrl: any;
  CameraSource = CameraSource;


  constructor(
    private http: HttpClient,
    private router: Router,
    private actionCtrl: ActionSheetController,
    private dataCtrl: DataService,
    private platform: Platform
  ) {}

  async openCamera(){
    const actionSheet = await this.actionCtrl.create({
      buttons: [
        {
          text: await this.dataCtrl.translateWord("Kamera"),
          handler: () => {  
            this.getPhoto(CameraSource.Camera);
          }  
        },
        {
          text: await this.dataCtrl.translateWord("Galerija"),
          handler: () => {  
            this.getPhoto(CameraSource.Photos);
          }  
        },
        {
          text: await this.dataCtrl.translateWord("Otkaži"),
          role: 'cancel',
          handler: () => {  
            console.log('cancel');
          }  
        },
      ],
    });
 
    await actionSheet.present();
  }

  /*async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt,
    });

    this.base64 = image.dataUrl!;
  }*/

    async getPhoto(sourceType: CameraSource) {
      if(this.platform.is('capacitor') == true){
        const image = await Camera.getPhoto({
          quality: 90,
          allowEditing: true,
          resultType: CameraResultType.Base64,
          source: sourceType,
          correctOrientation: false,
          width: 1500
        });
    
        let format: string = image.format;
        let mime: string = '';
        if(format == 'jpeg' || format == 'jpg'){
          mime = 'image/jpeg';
        }else{
          mime = 'image/png';
        }
    
        this.base64 = 'data:' + mime + ';base64,' + image.base64String;
        this.imageLoad = true;
      }
      else{
        this.imageLoad = true;
        this.base64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII=';
      }
    }

  // Get current GPS coordinates
  async getLocation() {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      this.location = {
        lat: coordinates.coords.latitude,
        lng: coordinates.coords.longitude,
      };
    } catch (error) {
      console.error('Error getting location:', error);
      alert('Failed to get location. Please ensure GPS is enabled.');
    }
  }

  async saveToServer(){

    // get attachment key
    let attachment_key_response = await this.dataCtrl.postServer('https://ivanic-grad-dabar.versalink-api.com/api/multimedia/attachment_key',{company_id: environment.company_id})
    .catch(err => {return undefined;});

    console.log("attachment key:", attachment_key_response);

    if(attachment_key_response != undefined && attachment_key_response?.['message'] == 'success'){
      let attachment_key = attachment_key_response['data']['id'];

      // get location
      let location = await this.nativeCtrl.getPosition();
      let coords = '';
      if(location != false){
        coords = location['coords']['latitude'] + ',' + location['coords']['longitude'];
      }

      // send image and get image id
      let response_image = await this.dataCtrl.postServer('https://ivanic-grad-dabar.versalink-api.com/api/multimedia/multimedia_offline', {base_64: this.base64, company_id: environment.company_id})
      .catch(err => {return undefined;});

      if(response_image != undefined && response_image?.['message'] == 'success' && attachment_key != ''){
        let image_id = response_image['data']['data'];

        // send image_id to attachment_id
        let data_send = {
          attachment: '['+image_id+']',
          attachment_key: attachment_key,
          company_id: environment.company_id
        };

        let response_attachment = await this.dataCtrl.postServer('https://ivanic-grad-dabar.versalink-api.com/api/multimedia/attachment_v2', data_send);


        // send report
        let sendReportData = {
          report_id: 7, // hardcoded, it always have to be 7 
          data_1: this.input_text,
          company_id: environment.company_id,
          report_attachment_key: attachment_key,
          data_2: coords
        };

        let response_report = await this.dataCtrl.postServer('https://ivanic-grad-dabar.versalink-api.com/api/report/report_offline', sendReportData).catch(err => {return undefined;});

        if(response_report != undefined && response_report?.['message'] == 'success'){
          // success
          // display success message
        }
      }
    }
    this.base64 = '';
    this.input_text = '';
    this.imageLoad = false;
  }
}
