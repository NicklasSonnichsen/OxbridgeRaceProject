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


    console.log("PLS IKKE UNDEFINED: " + this.boats[0]);
    console.log("CrewNames  er   " + this.CrewNames);


    //this.GetAllTeams(this.boats)

    //this.boats = this.boats.map(boat => {
    //  boat.label = {
    //    text: boat.name,
    //    color: "red",
    //    fontWeight: "bold",
    //    fontSize: "16px"
    //  };
    //  return boat;
    //})

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

      

      this.showUpdatedItem(this.gpsLocation)
      this.showUpdatedItem(this.gpsLocation2)
      
    }
   )
    
  }

  boats: BoatProps[] = [
    {
      name: "test2",
      lat: 54.90926,
      lng: 9.80737
    },
    {
      name: "MartinCrew",
      lat: 54.90926,
      lng: 9.70737
    }]
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

  GetAllTeams() {

    this.http.get<any>('http://localhost:3000/gpsnames')
      .subscribe({
        next: result => this.CrewNames = result,
        error: err => console.log(err)
      })

    for (var i = 0; i < this.CrewNames.length; i++) {
      //this.boats = new Array<BoatProps>();
      //this.boats.push(this.CrewNames[i])

      console.log("Hallo du ");

    }
  }


  OnStop() {
    console.log("STOP BUTTON PRESSED");
    
  }
}
