import { Component, OnInit } from '@angular/core';
import { RaceForm } from '../models/race-form';
import { HttpClient } from '@angular/common/http';
import { CookieService } from "angular2-cookie/core";
import { Router } from '@angular/router';
import { Observable, } from 'rxjs';
import { map } from 'rxjs/operators';
import { CrewForm } from "../models/CrewForm";
import { error } from '@angular/compiler/src/util';
import { removeSummaryDuplicates } from '@angular/compiler';

@Component({
  selector: 'app-manager-page',
  templateUrl: './manager-page.component.html',
  styleUrls: ['./manager-page.component.css']
})


export class ManagerPageComponent implements OnInit {

  public crews: CrewForm[]; 
  public races: RaceForm[];
  public contestants: Array<CrewForm>;
  public getContestants: CrewForm[];

  raceSubmitted = false;
  crewSubmitted = false;
  submitContestants = false;
  RaceStatus = false;
  
  public tempID;

  ChangeInfoRace = false;
  ChangeInfoTeam = false;

  //urls to the backend
  public urlTeam = 'http://localhost:3000/crew/';
  public urlRace = 'http://localhost:3000/race/';
  public urlContestants = 'http://localhost:3000/contestants/';


  enableEdit = false;
  enableEditIndex = null;


  constructor(private http: HttpClient, 
    private Cookie: CookieService, 
    private router: Router,
    ) {}

    /**
     * Checks for cookies on page load
     */
  ngOnInit(): void {
    var cookie = this.Cookie.get("user");
    if(cookie == null){
      console.log("401 not authorized - No cookie found");
      this.router.navigate(['/admin-login'])
    }
  }

  /**
   * Used for enabling/disabling the "edit buttons"
   * @param e 
   * @param i 
   */
  enableEditMethod(e, i) {
    this.enableEdit = true;
    this.enableEditIndex = i;
    console.log(i, e);
  }
  /**
   * Prompts a list with all the crews
   */
  SearchTeam(){
    this.crewSubmitted = true
    this.raceSubmitted = false;
    this.submitContestants = false;
    this.http.get<any>(this.urlTeam)
    .subscribe({
      next: result => this.crews = result,
      error: err => console.log(err) 
    }) 
  };


  /**
   * prompts a list with all the races
   */
  SearchRace(){
    this.raceSubmitted = true;
    this.crewSubmitted = false;

    this.http.get<any>(this.urlRace)
    .subscribe({
      next: result => this.races = result,
      error: err => console.log(err) 
    })
  }

  /**
   * Saves changes made to the crew
   * @param crew 
   */
  SaveChangesCrew(crew){
    console.log(crew.fld_CrewName);
    this.http.patch(this.urlTeam + crew.fld_CrewName, crew).subscribe();
  }

  /**
   * Deletes a crew
   * @param crew 
   */
  DeleteCrew(crew){
    this.http.delete(this.urlTeam + crew.fld_CrewName).subscribe();
  }

  /**
   * Deletes a race from the list
   * @param race Selected race
   */
  DeleteRace(race){
    this.http.delete(this.urlRace + race._id).subscribe();
  }


  /**
   * Saves the changes made to the race
   * @param race Selected race
   * @param id Race ID
   */
  SaveChangesRace(race, id){
    console.log(race.fld_Zipcode);
    this.http.patch(this.urlRace + id, race).subscribe();
  }

  /**
   * Gets the race ID from the selected list
   * and prompts a new table with contestants
   * @param race The selected race
   * @param id The race ID
   */
  UpdateContestants(race, id){
    this.submitContestants = true;
    this.contestants = race;
    this.tempID = id;
    console.log(this.tempID);
  }

  /**
   * Adds a contestant to a race
   * @param contestant Crew which participates in a race
   */
  AddContestants(contestant){
    
    console.log(contestant)
    this.http.get<any>(this.urlTeam + contestant).subscribe(data =>{
      console.log(data);

      this.getContestants = data;
      console.log(contestant);
    });
      console.log(this.tempID)
      this.http.put<any>(this.urlContestants + this.tempID, this.getContestants).subscribe({
      next: result => console.log(result),
      error: err => console.log(err)
    });
    

  }

  /**
   * Deletes a contestant under the selected race
   * @param contestant Crew which participates in a race
   * @param id contestant ID
   */
  DeleteContestant(contestant, id){
    this.http.get<any>(this.urlRace + this.tempID).subscribe(result => {
      console.log(result.fld_Contestants);

      var contestantsArray = result.fld_Contestants;
      contestantsArray.forEach(element => {
        if (element._id == id) {
          this.http.patch<any>(this.urlContestants + this.tempID, contestant).subscribe(result =>{
            console.log(result);
          });
        }
      });
    })
  }


  /**
   * Removes the cookie from the browser
   * making it unable to use manager functions
   */
  LogOut(){
    this.Cookie.remove("user");
    this.router.navigate(['/admin-login'])
  }


  
  StartRace(){
    this.http.get<any>(this.urlRace + "6430").subscribe({
      next: result => this.races = result,
      error: err => console.log(err)
    });

    console.log(this.races);

    this.RaceStatus = true;

    while(this.RaceStatus){
      console.log("race is running");
      //setInterval()
    }


  }

  EndRace(){
    this.RaceStatus = false
  }

}
