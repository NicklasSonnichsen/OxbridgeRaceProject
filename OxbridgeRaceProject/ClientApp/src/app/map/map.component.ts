import { Component, Injectable, OnInit } from '@angular/core';
import { GpsLocation } from '../models/gps-location';
import { SpecificCrewInfo } from '../models/specific-crew-info'
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AgmMarker } from '@agm/core';
import { interval } from 'rxjs'
import { map } from 'rxjs/operators'
import { RaceForm } from '../models/race-form';
import { CookieService } from "angular2-cookie/core";

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
export class MapComponent implements OnInit {
  latitude = 54.90926;
  longitude = 9.80737;
  public gpsLocation: GpsLocation;
  public gpsLocation2: GpsLocation;
  public nInterval;
  public secondCounter = interval(1000)
  myVar;
  isRunning: boolean
  isStarted: boolean

  public isEnabled = false;
  CrewNames: SpecificCrewInfo[];
 
 
  
  constructor(private http: HttpClient, private Cookie: CookieService) {
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
    ngOnInit(): void {
      
        var cookie = this.Cookie.get("user");
        if(cookie == null) {
        this.isEnabled = false;

      }
    else {
        this.isEnabled = true;
      }

      console.log("isRunning er:  " + this.isRunning)
      if (this.CheckIfRunning) {

        this.GetAllTeams
      }
    
    }



  onChooseLocation(event) {
    console.log(event);
  }

 
  OnStart() {
    
    this.isRunning = true;  


    //this.http.get<any>('http://localhost:3000/gpsnames')
    //  .subscribe({
    //    next: result => this.CrewNames = result,
    //    error: err => console.log(err)
    //  })

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
    
    this.nInterval = setInterval(() => {
      this.GetAllTeams
      console.log("JEG ER FRA INTERVAL");
      this.http.get<any>('http://localhost:3000/gpsnames')
        .subscribe({
          next: result => this.CrewNames = result,
          error: err => console.log(err)
        })

      console.log("Det virker ");

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



      }}, 1000)
    
    
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
    this.isRunning = false;
    console.log("STOP BUTTON PRESSED");
    this.boats = [];
    //clearInterval(this.secondCounter)
    clearInterval(this.nInterval)
    
  }

  CheckIfRunning() {
    console.log("er isRunning true:  " + this.isRunning);
    console.log("er isStarted true:  " + this.isStarted);
    if (this.isRunning) {

      this.isStarted = true;

      

    }
    return this.isStarted;
  }
}
