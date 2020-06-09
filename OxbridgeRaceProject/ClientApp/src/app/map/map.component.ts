import { Component, Injectable } from '@angular/core';
import { GpsLocation } from '../models/gps-location';
import { SpecificCrewInfo } from '../models/specific-crew-info'
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AgmMarker } from '@agm/core';
import { interval } from 'rxjs'
import { map } from 'rxjs/operators'
import { RaceForm } from '../models/race-form';

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
  public gpsLocation: GpsLocation;
  public gpsLocation2: GpsLocation;
  nInterval;
  isRunning: boolean
  CrewNames: SpecificCrewInfo[];
 
  
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

    this.http.get<any>('http://localhost:3000/gpsnames')
      .subscribe({
        next: result => this.CrewNames = result,
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
    this.isRunning = true;  


    this.http.get<any>('http://localhost:3000/gpsnames')
      .subscribe({
        next: result => this.CrewNames = result,
        error: err => console.log(err)
      })

    this.GetAllTeams();

    this.boats = this.boats.map(boat => {
      boat.label = {
        text: boat.name,
        color: "red",
        fontWeight: "bold",
        fontSize: "16px"
      };
      return boat;
    })

    secondCounter.subscribe(n => {
 
      this.GetAllTeams();    
      
    }
   )
    
  }

  boats: BoatProps[] = []
  icon = {
    labelOrigin: { x: 16, y: 48 },
    url: "/assets/BoatMarker2.jpg.png",
    scaledSize: {
      width: 32,
      height: 32
    }
  };


  GetAllTeams() {

    this.http.get<any>('http://localhost:3000/gpsnames')
      .subscribe({
        next: result => this.CrewNames = result,
        error: err => console.log(err)
      })
  
    for (var i = 0; i < this.CrewNames.length; i++) {

      if (this.boats[i] == undefined) {
        this.boats[i] = { name: this.CrewNames[i]._id, lat: this.CrewNames[i].lat, lng: this.CrewNames[i].lng }
        console.log(this.boats[i].name);   
      }
      else if (this.boats[i].name.match(this.CrewNames[i]._id)) {
        console.log("This is boats.name:   " + this.boats[i].name);
        console.log("this is CrewNames.name:   " + this.CrewNames[i]._id);
        this.boats[i].lat = this.CrewNames[i].lat
        this.boats[i].lng = this.CrewNames[i].lng
      }
      
      

    }
  }


  OnStop() {
    console.log("STOP BUTTON PRESSED");

    
  }
}
