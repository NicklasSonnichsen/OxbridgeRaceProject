import { Component } from '@angular/core';
import { GpsLocation } from '../models/gps-location';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AgmMarker } from '@agm/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent{
  latitude = 54.90926;
  longitude = 9.80737;
  public pinLattitude;
  public pinLongitude;
  public gpsLocation: GpsLocation[]
 

  public model: GpsLocation;
  constructor(private http: HttpClient) {

  

    
  }

  onChooseLocation(event)
  {
    console.log(event);
  }

  public OnStart()
  {
    console.log("GET Button has been pressed")

    this.http.get<GpsLocation[]>('http://localhost:3000/gps').subscribe((gpsLocation: GpsLocation[]) => {

      this.gpsLocation = gpsLocation



    })

  }

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  public StartTheMoveMent()
  {

    

    setInterval(this.testmethod2, 1000);
    
    //this.gpsLocation.forEach(function (value) {
           
      
    //  this.pinLattitude = value.fld_Lattitude;
    //  this.pinLongitude = value.fld_Longitude;
      

    //});
  }

  public testmethod2() {
    for (let i = 0; i < this.gpsLocation.length; i++) {
      console.log("UPDATE location")

      this.pinLattitude = this.gpsLocation[i].fld_Lattitude;
      this.pinLongitude = this.gpsLocation[i].fld_Longitude;
      console.log("THIS IS THE LAtitude    : " + this.gpsLocation[i].fld_Lattitude);


    }
  }
  public Next()
  {
    //this.pinLattitude = 54.90926;
    //this.pinLongitude = 9.80737;

    console.log("WAIT");
  }

}
