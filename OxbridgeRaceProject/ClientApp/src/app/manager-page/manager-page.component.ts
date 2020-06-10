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

  public urlTeam = 'http://localhost:3000/crew/';
  public urlRace = 'http://localhost:3000/race/';


  enableEdit = false;
  enableEditIndex = null;


  constructor(private http: HttpClient, 
    private Cookie: CookieService, 
    private router: Router,
    ) {}

  ngOnInit(): void {
    var cookie = this.Cookie.get("user");
    if(cookie == null){
      console.log("401 not authorized - No cookie found");
      this.router.navigate(['/admin-login'])
    }
  }

  enableEditMethod(e, i) {
    this.enableEdit = true;
    this.enableEditIndex = i;
    console.log(i, e);
  }

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


  SearchRace(){
    this.raceSubmitted = true;
    this.crewSubmitted = false;

    this.http.get<any>(this.urlRace)
    .subscribe({
      next: result => this.races = result,
      error: err => console.log(err) 
    })
  }

  SaveChangesCrew(crew){
    console.log(crew.fld_CrewName);
    this.http.patch(this.urlTeam + crew.fld_CrewName, crew).subscribe();
  }

  DeleteCrew(crew){
    this.http.delete(this.urlTeam + crew.fld_CrewName).subscribe();
  }

  DeleteRace(race){
    this.http.delete(this.urlRace + race._id).subscribe();
  }



  SaveChangesRace(race, id){
    console.log(race.fld_Zipcode);
    this.http.patch(this.urlRace + id, race).subscribe();
  }

  UpdateContestants(race, id){
    this.submitContestants = true;
    this.contestants = race;
    this.tempID = id;
    console.log(this.tempID);
  }

  AddContestants(contestant){
    
    console.log(contestant)
    this.http.get<any>(this.urlTeam + contestant).subscribe(data =>{
      console.log(data);
      if (data.fld_CrewName.contains(contestant.fld_CrewName)) {
        console.log("duplicate found")
      } else {
        
      }

      this.getContestants = data;
      console.log(contestant);
    })
    
    console.log(this.tempID)

    this.http.put<any>('http://localhost:3000/contestants/' + this.tempID, this.getContestants).subscribe({
      next: result => console.log(result),
      error: err => console.log(err)
    });

  }

  DeleteContestant(contestant, id){
    this.http.get<any>(this.urlRace + this.tempID).subscribe(result => {
      console.log(result.fld_Contestants);

      var contestantsArray = result.fld_Contestants;
      contestantsArray.forEach(element => {
        if (element._id == id) {
          this.http.patch<any>('http://localhost:3000/contestants/' + this.tempID, contestant).subscribe(result =>{
            console.log(result);
          });
        }
      });
    })
  }

  LogOut(){
    this.Cookie.remove("user");
    this.router.navigate(['/admin-login'])
  }

  testMethod(){
    console.log("")
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


interface Contestants{
  fld_CrewName: string;
  fld_Captain: string;
  fld_Members: number;
  fld_Category: string;
}
