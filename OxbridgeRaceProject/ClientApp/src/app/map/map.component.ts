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
  public pinLattitude2;
  public pinLongitude2;
  public gpsLocation: GpsLocation[]
  public gpsLocation2: GpsLocation[]
  public IsRunning = true;
 

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

    this.http.get<GpsLocation[]>('http://localhost:3000/test2').subscribe((gpsLocation: GpsLocation[]) => {

      this.gpsLocation = gpsLocation

    })

    this.http.get<GpsLocation[]>('http://localhost:3000/MartinCrew').subscribe((gpsLocation: GpsLocation[]) => {

      this.gpsLocation2 = gpsLocation

    })
    while (this.IsRunning) {
      setTimeout(this.testmethod2, 500);
      setTimeout(this.testmethod3, 500);
    }
    
  }


  public testmethod2() {
    for (let i = 0; i < this.gpsLocation.length; i++) {
      console.log("UPDATE location")

      this.pinLattitude = this.gpsLocation[i].fld_Lattitude;
      this.pinLongitude = this.gpsLocation[i].fld_Longitude;
      console.log("THIS IS THE LAtitude    : " + this.gpsLocation[i].fld_Lattitude);


    }
  }

  public testmethod3() {
    for (let i = 0; i < this.gpsLocation2.length; i++) {
      console.log("UPDATE location")

      this.pinLattitude2 = this.gpsLocation2[i].fld_Lattitude;
      this.pinLongitude2 = this.gpsLocation2[i].fld_Longitude;
      console.log("THIS IS THE LAtitude    : " + this.gpsLocation2[i].fld_Lattitude);


    }
  }

  public OnStop()
  {
    this.IsRunning = false;
  }
}
