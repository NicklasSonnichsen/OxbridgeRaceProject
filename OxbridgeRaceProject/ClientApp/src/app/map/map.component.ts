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
  pinLattitude: number
  pinLongitude: number
  pinLattitude2: number
  pinLongitude2: number
  public gpsLocation: GpsLocation;
  public gpsLocation2: GpsLocation; 
  constructor(private http: HttpClient) {
    this.http.get<any>('http://localhost:3000/gps/test2')
      .subscribe({
        next: result => this.gpsLocation = result,
        error: err => console.log(err)
      })

    this.http.get<any>('http://localhost:3000/gps/MartinCrew')
      .subscribe({
        next: result => this.gpsLocation2 = result,
        error: err => console.log(err)
      })

  }

  onChooseLocation(event)
  {
    console.log(event);
  }

   OnStart()
   {
     while (true) {

       this.http.get<any>('http://localhost:3000/gps/test2')
         .subscribe({
           next: result => this.gpsLocation = result,
           error: err => console.log(err)
         })

       this.http.get<any>('http://localhost:3000/gps/MartinCrew')
         .subscribe({
           next: result => this.gpsLocation2 = result,
           error: err => console.log(err)
         })

       console.log("latitude for test2 from Onstart():  " + this.gpsLocation.fld_Lattitude)
       console.log("latitude for MartinCrew from Onstart():  " + this.gpsLocation2.fld_Lattitude)
    

     }
     
     
   }

  public testmethod2() {
    this.http.get<any>('http://localhost:3000/gps/test2')
      .subscribe({
        next: result => this.gpsLocation = result,
        error: err => console.log(err)
      })

    console.log("latitude for test2:  " + this.gpsLocation.fld_Lattitude)
  }

  public testmethod3() {
    this.http.get<any>('http://localhost:3000/gps/MartinCrew')
      .subscribe({
        next: result => this.gpsLocation2 = result,
        error: err => console.log(err)
      })
    console.log("latitude for test2:  " + this.gpsLocation2.fld_Lattitude)
  }
  

  
   OnStop()
  {
    console.log("STOP BUTTON PRESSED");
    
  }
}
