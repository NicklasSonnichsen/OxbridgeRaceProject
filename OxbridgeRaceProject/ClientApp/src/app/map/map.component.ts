import { Component, Injectable } from '@angular/core';
import { GpsLocation } from '../models/gps-location';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AgmMarker } from '@agm/core';
import { interval } from 'rxjs'
import { map } from 'rxjs/operators'

interface BoatProps {
  name: string;
  lat: number;
  lng: number;
  label?: any;
}

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
  isRunning: boolean
  
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

    this.boats = this.boats.map(boat => {
      boat.label = {
        text: boat.name,
        color: "red",
        fontWeight: "bold",
        fontSize: "16px"
      };
      return boat;
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
    this.isRunning = true;

    

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
      this.gpsLocation.fld_CrewName

      console.log("latitude for test2 from Onstart():  " + this.gpsLocation.fld_Lattitude)
      console.log("latitude for MartinCrew from Onstart():  " + this.gpsLocation2.fld_Lattitude)

      this.showUpdatedItem(this.gpsLocation)
      this.showUpdatedItem(this.gpsLocation2)
      
    }
      

    )
       
    //this.nInterval = setInterval(this.GetNewPosition, 1000);
  }

  boats: BoatProps[] = [
    {
      name: "test2",
      lat: 54.90926 ,
      lng: 9.80737
    },
    {
      name: "MartinCrew",
      lat: 54.90926,
      lng: 9.70737
    }
  ];
  icon = {
    labelOrigin: { x: 16, y: 48 },
    url: "/assets/BoatMarker2.jpg.png",
    scaledSize: {
      width: 32,
      height: 32
    }
  };

 

  showUpdatedItem(newItem) {
    
    

    for (var i = 0; i < this.boats.length; i++) {
      console.log(this.boats[i].name + " ER DET, DET SAMME " + newItem.fld_CrewName);
      if (this.boats[i].name.toString().match(newItem.fld_CrewName)) {
               
        this.boats[i].lat = newItem.fld_Lattitude;
        this.boats[i].lng = newItem.fld_Longitude;       

      }

    }



    

  }


  OnStop() {
    console.log("STOP BUTTON PRESSED");
    clearInterval(this.nInterval);

  }
}
