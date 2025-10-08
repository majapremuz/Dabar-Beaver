import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ContentApiInterface, ContentObject } from 'src/app/model/content';
import { ControllerService } from 'src/app/services/controller.service';
import { GmapsService } from 'src/app/services/gmaps.services';
import { NativeService } from 'src/app/services/native.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { trigger, transition, useAnimation, state, style, keyframes, animate } from '@angular/animations';
import { BackButtonComponent } from 'src/app/components/back-button/back-button.component';
import { NagradaBtnComponent } from 'src/app/components/nagrada-btn/nagrada-btn.component';


@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, BackButtonComponent, NagradaBtnComponent],
  animations: [
    trigger('shakeit', [
        state('shakestart', style({
            transform: 'scale(1)',
        })),
        state('shakeend', style({
            transform: 'scale(1)',
        })),
        transition('shakestart <=> shakeend', animate('1000ms ease-in',     keyframes([
          style({transform: 'translate3d(-1px, 0, 0)', offset: 0.1}),
          style({transform: 'translate3d(2px, 0, 0)', offset: 0.2}),
          style({transform: 'translate3d(-4px, 0, 0)', offset: 0.3}),
          style({transform: 'translate3d(4px, 0, 0)', offset: 0.4}),
          style({transform: 'translate3d(-4px, 0, 0)', offset: 0.5}),
          style({transform: 'translate3d(4px, 0, 0)', offset: 0.6}),
          style({transform: 'translate3d(-4px, 0, 0)', offset: 0.7}),
          style({transform: 'translate3d(2px, 0, 0)', offset: 0.8}),
          style({transform: 'translate3d(-1px, 0, 0)', offset: 0.9}),
        ]))),
  ])]
})
export class LocationPage implements OnInit {

  @ViewChild('map', {static: true}) mapElementRef?: ElementRef;

  googleMaps: any;
  map: any;
  mapEl: any;

  dataLoad: boolean = false;
  translate: any = [];
  contents: Array<ContentObject> = [];
  category!: ContentObject;

  markers!: Array<any>;

  isModalOpen: boolean = false;
  modalType: string = '';
  modalMarker: any = null;

  nearest_marker: number = 0;

  navigation_steps: Array<any> = [];
  navigationClear: boolean = true;
  navigation_total_distance: string = '';
  navigation_total_time: string = '';

  directionsService: any;
  directionsRenderer: any;

  isNearMarker: boolean = false;
  has_my_location: boolean = false;

  animationState:string = 'shakestart';

  constructor(
    private gmaps: GmapsService,
    private dataCtrl: ControllerService,
    private renderer: Renderer2,
    private nativeCtrl: NativeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    //
  }

  runAnimation(){
    if(this.animationState == 'shakestart'){
      this.animationState = 'shakeend';
    }else{
      this.animationState = 'shakestart';

    }
  }

  async ngAfterViewInit() {
    await this.initPage(45.6830215, 16.4049789, 10); // ivanic grad lokacija
    await this.getData();
    await this.getMyLocation();


    this.route.queryParams.subscribe(async params => {
      if(params?.['lat'] != null){
        let lat = params['lat'] ? parseFloat(params['lat']) : 46;
        let lng = params['lng'] ? parseFloat(params['lng']) : 16;
        let zoom = 13;

        // Initialize map at given location
        const location = new this.googleMaps.LatLng(lat, lng);
        this.centerMap(location,zoom);
        
        // Check if a new location is searched and add a red pin
        if (params['lat'] && params['lng']) {
          console.log("Location Name:", params['locationName']);
          //this.addRedMarker(lat, lng);
        }
      }
    });
  }

  

  async centerMap(location: any, zoom: number){
    await this.map.panTo(location);
    await this.map.setZoom(zoom);
  }

  extendScreen(){
    let bounds = new this.googleMaps.LatLngBounds();

    this.markers.map(item => {
      bounds.extend(item.marker.getPosition());
    });

    this.map.fitBounds(bounds);
  }

  clearDirection(){
    this.directionsRenderer.setMap(null);
    this.navigation_steps = [];
    this.navigationClear = true;
    console.log('clear');
  }

  async direction(id: number){
    let destination = this.markers.find(item => item.id == id).marker.getPosition();
    let origin = this.markers.find(item => item.id == 0);

    if(origin != undefined){
      origin = origin.marker.getPosition();


      //this.directionsRenderer.setMap(this.map);

      var request = {
        origin:origin,
        destination:destination,
        travelMode: this.googleMaps.TravelMode.WALKING
      };

      let response = await this.directionsService.route(request, function(response: any, status: any) {
        if (status == 'OK') {
          return response;
        }
      });

      if(response){
        //this.directionsRenderer.setDirections(response);
        this.writeDirection(response);
      }

    }
  }

  writeDirection(response: any){
    let steps = response?.routes[0]?.legs[0]?.steps || null;
    let legs = response?.routes[0]?.legs[0] || null;

    if(legs != null){
      this.navigation_total_distance = legs.distance.text;
      this.navigation_total_time = legs.duration.text;
    }

    this.navigationClear = true;

    if(steps != null){
      if(steps.length > 0){
        steps.map((item: any) => {
          let data = {
            instructions: item.instructions,
            distance: item.distance.text,
            duration: item.duration.text
          }
          this.navigation_steps.push(data);
        })
        this.navigationClear = false;
      }
    }
  }

  async getMyLocation() {
    try {
      let position = await this.nativeCtrl.getPosition();
      let lat = 0;
      let lng = 0;

      if(position != false){
        lat = position['coords']['latitude'];
        lng = position['coords']['longitude'];
      }
      this.has_my_location = true;
  
      await this.calculateLocation(lat, lng);
    } catch {
      this.has_my_location = false;
    }
  }
  

  async calculateLocation(lat: any, lng: any){
    let myPositionMarker = this.markers.find(item => item.id == 0);

    if(myPositionMarker == undefined){
      myPositionMarker = this.createMarker(lat, lng, 0, 'assets/dark-green-map-pin.png');

      let tmpObject = {
        id: 0,
        location_radius: 0,
        distance: null,
        objekt: null,
        marker: myPositionMarker,
        type: null
      };

      this.markers.push(tmpObject);
    }else{
      let newLatLng = new this.googleMaps.LatLng(lat, lng);
      myPositionMarker.marker.setPosition(newLatLng);
    }

    this.markers.map(item => {
      if(item.id != 0){
        let lat_marker = item.marker.getPosition().lat();
        let lng_marker = item.marker.getPosition().lng();
        // distance in meters
        let distance = this.distance(lat, lng, lat_marker, lng_marker) * 1000;
        item.distance = distance;
      }
    });

    // find nearest location
    let distance: any = null;
    let id_nearest: number = 0;
    let radius_nearest: number = 0;
    this.markers.map(item => {
      if(item.id != 0){
        if(item.distance != null){
          if(distance == null || item.distance < distance){
            distance = item.distance;
            id_nearest = item.id;
            radius_nearest = item.location_radius;
          }else{
            if(item.distance < distance){
              distance = item.distance;
              id_nearest = item.id;
              radius_nearest = item.location_radius;
            }
          }
        }
      }
    });

    this.markers.map(item => {
      if(item.id != 0){
          item.type = 'red';
      }
    })
    this.redrawMarkers(); 

    if(id_nearest != 0){
      if(distance < radius_nearest){
        //change icon of marker
        let test: boolean = false;
        this.markers.map(item => {
          if(item.id != 0){
            if(item.id == id_nearest){
              item.type = 'green';
              test = true;
              this.nearest_marker = id_nearest;
              if(id_nearest != this.nearest_marker){
                this.nearest_marker = id_nearest;
                this.modalMarker = item;
                this.openModal('near_marker');
              }
            }
          }
        })
        this.isNearMarker = test;
      }else{
        this.isNearMarker = false;
      }
    }else{
      this.isNearMarker = false;
    }

    console.log(this.isNearMarker);
    this.redrawMarkers();
  }

  redrawMarkers(){
    this.markers.map(item => {
      if(item.id != 0){
        if(item.type != null){
          if(item.type == 'red'){
            this.changeMarkerIcon(item.marker, 'assets/red-map-pin.png');
          }
          if(item.type == 'green'){
            this.changeMarkerIcon(item.marker, 'assets/green-map-pin.png');
          }
        }
      }
    })
  }

  changeMarkerIcon(marker: any, iconUrl: string) {
    const icon = {
      url: iconUrl,
      scaledSize: new this.googleMaps.Size(50, 50),
      anchor: new this.googleMaps.Point(15, 30)
    };
    marker.setIcon(icon);
  }

  addRedMarker(lat: number, lng: number) {
    if (!this.map) return;

    const redMarker = new this.googleMaps.Marker({
        position: { lat, lng },
        map: this.map,
        icon: {
            url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
            scaledSize: new this.googleMaps.Size(50, 50)
        }
    });

    this.markers.push({ id: 'searched-location', marker: redMarker });
}
  

  distance(lat1: number, lon1: number, lat2: number, lon2: number) {
    var p = 0.017453292519943295;    // Math.PI / 180
    var c = Math.cos;
    var a = 0.5 - c((lat2 - lat1) * p)/2 + 
            c(lat1 * p) * c(lat2 * p) * 
            (1 - c((lon2 - lon1) * p))/2;
  
    return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
  }

  async initPage(lat: number, lng: number, zoom: number){
    if(this.mapEl == undefined){
      await this.loadMap(lat, lng, zoom);
    }
    this.renderer.addClass(this.mapEl, 'visible');
  }

  async loadMap(lat: number, lng: number, zoom: number){
    let latitude = lat;
    let longitude = lng;
    let zoom_float = zoom;

    try{
      let googleMaps: any = await this.gmaps.loadGoogleMaps();
      this.googleMaps = googleMaps;
      this.directionsService = new this.googleMaps.DirectionsService();
      this.directionsRenderer = new this.googleMaps.DirectionsRenderer();
      this.mapEl = this.mapElementRef?.nativeElement;
      const location = new googleMaps.LatLng(latitude, longitude);
      this.map = new googleMaps.Map(this.mapEl, {
        center: location,
        zoom: zoom_float,
        disableDefaultUI: true
      });
    } catch(e){
      console.log(e);
    }
  }

  createMarker(lat: number, lng: number, id: number, iconUrl: string = 'assets/red-map-pin.png'){
    const location = new this.googleMaps.LatLng(lat, lng);

    let icon_url = iconUrl;
    let scale= new this.googleMaps.Size(35, 40);
    let anchor = new this.googleMaps.Point(12,35);

    const icon = {
      url: icon_url,
      scaledSize: scale,
      anchor: anchor
    };

    const marker = new this.googleMaps.Marker({
      position: location,
      map: this.map,
      icon: icon
    });

    marker['custom_id'] = id;

    this.googleMaps.event.addListener(marker, 'click', () => {
      this.handleClickMarker(marker.custom_id);
    }); 

    return marker;
  }

  removeHtmlTags(data: string): string {
    if (!data) {
      return data; // Return if data is null or undefined
    }
    return data.replace(/<\/?[^>]+(>|$)/g, "");
  }

  async getData() {
    await this.dataCtrl.showLoader();
  
    const url_main_category = '/api/content/contents_main_group_offline'; 
    let main_category = await this.dataCtrl.getServer(url_main_category, true, 20).catch(err => {
      // Error handling...
      return undefined;
    });
  
    if (main_category !== undefined && main_category.data.data.length > 0) {
      let categoryData = main_category.data.data[4];
      let category = new ContentObject(categoryData);
   
      const url_category = `/api/content/content_offline/?id=${category.content_id}`;
      const url_articles = `/api/content/contents_offline/?id=${category.content_id}`;
      
      let category_data = await this.dataCtrl.getServer(url_category, true, 20).catch(err => {
        // Error handling...
        return undefined;
      });

      console.log(category_data);
  
      if (category_data != undefined) {
        // Remove HTML tags from category content
        category_data.data.content_name = this.removeHtmlTags(category_data.data.content_name);
        category_data.data.description = this.removeHtmlTags(category_data.data.description);
        this.category = new ContentObject(category_data.data);
      }
  
      let articles_data = await this.dataCtrl.getServer(url_articles, true, 20).catch(err => {
        // Error handling...
        return undefined;
      });
  
      if (articles_data != undefined) {
        this.contents = articles_data.data.data.map((item: ContentApiInterface) => {
          // Remove HTML tags from each article
          item.content_name = this.removeHtmlTags(item.content_name);
          item.content_description = this.removeHtmlTags(item.content_description);
          return new ContentObject(item);
        });
      }
  
      this.defineMarkers();
      this.dataLoad = true;
    }
    
    await this.dataCtrl.hideLoader();
  }
  
  
  defineMarkers(){
    this.markers = [];
    this.contents.map((item: ContentObject) => {
      if(!item.content_location.isClear()){
        let marker = this.createMarker(item.content_location.lat, item.content_location.lng, item.content_id, 'assets/red-map-pin.png');
        let tmpObject = {
          id: item.content_id,
          location_radius: item.content_location_radius,
          distance: null,
          objekt: item,
          marker: marker,
          type: 'red'
        };
  
        this.markers.push(tmpObject);
      }
    });
  }

  handleClickMarker(id: number){
    console.log(id);
    if(id == 0){
      this.openModal('click_my_location');
    }else{
      let marker = this.markers.find(item => item.id == id);
      if (marker) {
        this.modalMarker = marker;
        this.openModal('click_marker');
      }
    }
  }

  async openText(id: number){
    this.closeModal();
    await this.dataCtrl.wait(300);
    this.router.navigate(['/tekst-lokacije', id]);
  }

  openModal(type: string){
    if(type == 'near_marker'){
      this.markers.map(item => {
        if(this.nearest_marker == item.id){
          this.modalMarker = item;
        }
      });
    }
    console.log(this.modalMarker);
    if(this.isModalOpen == false){
      this.modalType = type;
      this.isModalOpen = true;
    }
  }

  closeModal(){
    this.clearDirection();
    this.isModalOpen = false;
  }

  onWillDismiss(event: Event) {
    this.closeModal();
  }

  

}
