import { Component, Injectable, OnInit } from '@angular/core';
import { GpsLocation } from '../models/gps-location';
import { SpecificCrewInfo } from '../models/specific-crew-info'
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Observable, throwError, race } from 'rxjs';
import { AgmMarker } from '@agm/core';
import { interval } from 'rxjs'
import { map } from 'rxjs/operators'
import { RaceForm } from '../models/race-form';
import { CookieService } from "angular2-cookie/core";
import { RacesStartedModel } from '../models/races-started-model';

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
  public nInterval;
  public secondCounter = interval(1000)
  public raceStartedModel: RacesStartedModel;
  public interValOnInit;
  public isRunning: boolean
  public isStarted: boolean
  boats: BoatProps[] = []
  public isEnabled = false;
  CrewNames: SpecificCrewInfo[];
 
 
  
  constructor(private http: HttpClient, private Cookie: CookieService) {   

    // this is done for avoiding undefined 
    this.http.get<any>('http://localhost:3000/gpsnames')
      .subscribe({
        next: result => this.CrewNames = result,
        error: err => console.log(err)
      })
      
  }
    ngOnInit(): void {
        // if ypu have a cookie some buttons are visble in the map page. 
        var cookie = this.Cookie.get("user");
        if(cookie == null) {
        this.isEnabled = false;

      }
    else {
        this.isEnabled = true;
      }

      this.http.get<RacesStartedModel>('http://localhost:3000/bool/1')
        .subscribe({
          next: result => this.isRunning = result.fld_IsStarted,
          error: err => console.log(err)
        })
      // interval for updating boats location if you are not event manager
      
      this.interValOnInit = setInterval(() => {
       
        if (this.CheckIfRunning()) {                 
         
          if (cookie == undefined) {
           
            this.GetAllTeams
            // setting boats label for showcasing boat info on the map 
            this.boats = this.boats.map(boat => {
              boat.label = {
                text: boat.name,
                color: "red",
                fontWeight: "bold",
                fontSize: "16px"
              };
              return boat;
            })
            // getting all the crewNames
            this.http.get<any>('http://localhost:3000/gpsnames')
              .subscribe({
                next: result => this.CrewNames = result,
                error: err => console.log(err)
              })

            
            // looping through all the names and adding to boats 
            for (var i = 0; i < this.CrewNames.length; i++) {
              // if the boats at position i is empty/undefined add a new boat
              if (this.boats[i] == undefined) {
                this.boats[i] = { name: this.CrewNames[i]._id, lat: this.CrewNames[i].lat, lng: this.CrewNames[i].lng }
                console.log(this.boats[i].name);
              }
              // if the boats name match. update their location 
              else if (this.boats[i].name.match(this.CrewNames[i]._id)) {
            
                this.boats[i].lat = this.CrewNames[i].lat
                this.boats[i].lng = this.CrewNames[i].lng
              }

            }
          }
        }
      }, 1000)
      
    
    }

 
  OnStart() {
    // defining raceStartedModel so that when start button is pressed the fld_IsStarted is true.  
    this.raceStartedModel = { fld_Id: 1, fld_IsStarted: true };    
    // updating the DB so that isStarted==true.     
    this.http.put<RacesStartedModel>('http://localhost:3000/updateBool/1', this.raceStartedModel ).subscribe({
      next: result => console.log(result),
      error: err => console.log(err)
    });
    // setting isRunning to what isStarted is in the DB
    this.http.get<RacesStartedModel>('http://localhost:3000/bool/1')
      .subscribe({
        next: result => this.isRunning = result.fld_IsStarted,
        error: err => console.log(err)
      })

    // calling to get all teams and adding them to boats, has to be done if this is not done the boats names is not shown. 
    this.GetAllTeams();
    // setting the labels of the boats so you can see the crewnames of each boat. 
    this.boats = this.boats.map(boat => {
      boat.label = {
        text: boat.name,
        color: "red",
        fontWeight: "bold",
        fontSize: "16px"
      };
      return boat;
    })

    // starting interval that updates the location of each boat every second. it could not be done by calling GetAllTeams() inside the interval, it causes a undefined. 
    this.nInterval = setInterval(() => {
      // getting all the teams names that adding setting it to crewNames
      this.http.get<any>('http://localhost:3000/gpsnames')
        .subscribe({
          next: result => this.CrewNames = result,
          error: err => console.log(err)
        })
      // looping through crewNames 
      for (var i = 0; i < this.CrewNames.length; i++) {
        // if there is no boat at boats[i] there will be added one
        if (this.boats[i] == undefined) {
          this.boats[i] = { name: this.CrewNames[i]._id, lat: this.CrewNames[i].lat, lng: this.CrewNames[i].lng }
          console.log(this.boats[i].name);
        }
        // else if the namse are the same the boats location will be updated. 
        else if (this.boats[i].name.match(this.CrewNames[i]._id)) {

          this.boats[i].lat = this.CrewNames[i].lat
          this.boats[i].lng = this.CrewNames[i].lng
        }

      }}, 1000)
    
  
  }


  // defining the icon that is used on the map. 
  icon = {
    labelOrigin: { x: 16, y: 48 },
    url: "/assets/BoatMarker2.jpg.png",
    scaledSize: {
      width: 32,
      height: 32
    }
  };

  /**
   *gets all the team names and adds them to boats[]*/
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
      
        this.boats[i].lat = this.CrewNames[i].lat
        this.boats[i].lng = this.CrewNames[i].lng
      }
      
      

    }
  }

  /**
   * stops the intervals and sets the isStarted property to false so that there is not shown any boats on the map anymore.
   * resets boats to be empty
   * */
  OnStop() {
    this.isRunning = false;    
    this.boats = [];
    clearInterval(this.nInterval)
    this.raceStartedModel = { fld_Id: 1, fld_IsStarted: false };
    clearInterval(this.interValOnInit)

    this.http.put<RacesStartedModel>('http://localhost:3000/updateBool/1', this.raceStartedModel).subscribe({
      next: result => console.log(result),
      error: err => console.log(err)
    });

    this.http.get<RacesStartedModel>('http://localhost:3000/bool/1')
      .subscribe({
        next: result => this.isRunning = result.fld_IsStarted,
        error: err => console.log(err)
      })
        
  }
  // checking if isRunning is true and returns a true boolean if it is 
  CheckIfRunning() {
    if (this.isRunning) {

      this.isStarted = true;      

    }
    return this.isStarted;
  }
}
