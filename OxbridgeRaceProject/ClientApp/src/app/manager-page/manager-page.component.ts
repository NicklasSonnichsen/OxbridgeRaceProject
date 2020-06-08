import { Component, OnInit } from '@angular/core';
import { CrewForm } from '../models/CrewForm';
import { RaceForm } from '../models/race-form';
import { Contestants } from '../models/contestants';
import { HttpClient } from '@angular/common/http';
import { CookieService } from "angular2-cookie/core";
import { Router } from '@angular/router';
import { Observable, from } from 'rxjs';

@Component({
  selector: 'app-manager-page',
  templateUrl: './manager-page.component.html',
  styleUrls: ['./manager-page.component.css']
})


export class ManagerPageComponent implements OnInit {

  public crews: CrewForm[]; 
  public races: RaceForm[];
  public contestants: Contestants[];
  public getContestants: CrewForm[];

  raceSubmitted = false;
  crewSubmitted = false;
  submitContestants = false;

  RaceStatus = false;


  public tempZipcode: string;

  ChangeInfoRace = false;
  ChangeInfoTeam = false;

  public urlTeam = 'http://localhost:3000/crew/';
  public urlRace = 'http://localhost:3000/race/';


  enableEdit = false;
  enableEditIndex = null;


  constructor(private http: HttpClient, private Cookie: CookieService, private router: Router) {
   }

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

  SaveChangesRace(race){
    console.log(race.fld_Zipcode);
    this.http.patch(this.urlRace + race.fld_Zipcode, race).subscribe();
  }

  UpdateContestants(race, zipcode){
    this.submitContestants = true;
    this.contestants = race
    this.tempZipcode = zipcode;
    console.log(this.tempZipcode);
  }

  AddContestants(){
    
    this.http.get<any>(this.urlTeam + this.getContestants).subscribe({
      next: result => this.getContestants = result, 
      error: err => console.log(err),
    });

    console.log(this.getContestants)

    this.http.put<CrewForm>("/contestants/" + this.tempZipcode, this.getContestants).subscribe();

  }

  DeleteContestant(contestant){

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
