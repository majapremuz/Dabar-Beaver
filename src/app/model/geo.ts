import { environment } from "src/environments/environment";

interface GeoPoint {
    lat: number,
    lng: number 
}

export class GeoPointObject implements GeoPoint{
    lat: number;
    lng: number;
    private clear: boolean = true;

    constructor(){
        this.lat = 0;
        this.lng = 0;
    }

    create(lat: number, lng: number){
        this.lat = lat;
        this.lng = lng;
        this.clear = false;
    }

    createFromString(data: string){
        let split = data.split(",");
        let lat = split[0].trim();
        let lng = split[1].trim();

        this.lat = parseFloat(lat);
        this.lng = parseFloat(lng);
        this.clear = false;
    }

    clearObject(){
        this.lat = 0;
        this.lng = 0;
        this.clear = true;
    }

    isClear(){
        return this.clear;
    }

    getString(){
        if(this.isClear()){
            return '';
        }else{
            return `${this.lat},${this.lng}`;
        }
    }
}
