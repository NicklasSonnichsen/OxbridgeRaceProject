import { Component, Injectable } from '@angular/core';
import { GpsLocation } from '../models/gps-location';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AgmMarker } from '@agm/core';
import { interval } from 'rxjs'
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
@Injectable()
export class MapComponent {
  latitude = 54.90926;
  longitude = 9.80737;
  pinLattitude: number
  pinLongitude: number
  pinLattitude2: number
  pinLongitude2: number
  public gpsLocation: GpsLocation;
  public gpsLocation2: GpsLocation;
  nInterval;
  
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

  onChooseLocation(event) {
    console.log(event);
  }

  delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

  OnStart() {
    const secondCounter = interval(1000)

    secondCounter.subscribe(n => {
      console.log("http er:  " + this.http)
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

      this.pinLattitude = this.gpsLocation.fld_Lattitude
      this.pinLongitude = this.gpsLocation.fld_Longitude

      this.pinLattitude2 = this.gpsLocation2.fld_Lattitude
      this.pinLongitude2 = this.gpsLocation2.fld_Longitude

      console.log("latitude for test2 from Onstart():  " + this.gpsLocation.fld_Lattitude)
      console.log("latitude for MartinCrew from Onstart():  " + this.gpsLocation2.fld_Lattitude)
    }


    )
       
    //this.nInterval = setInterval(this.GetNewPosition, 1000);
  }

  GetNewPosition() {

    console.log("her er http :  " + this.http)

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


  OnStop() {
    console.log("STOP BUTTON PRESSED");
    clearInterval(this.nInterval);

  }
}
