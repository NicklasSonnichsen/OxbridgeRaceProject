import { Component, OnInit } from '@angular/core';
import { CrewForm } from '../models/CrewForm';
import { RaceForm } from '../models/race-form';
import { Contestants } from '../models/contestants';
import { HttpClient } from '@angular/common/http';
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
  public searchedCrew: string;
  public searchedRace: string;
  raceSubmitted = false;
  crewSubmitted = false;
  submitContestants = false;
  public tempZipcode: string;

  ChangeInfoRace = false;
  ChangeInfoTeam = false;

  public urlTeam = 'http://localhost:3000/crew/';
  public urlRace = 'http://localhost:3000/race/';


  enableEdit = false;
  enableEditIndex = null;


  constructor(private http: HttpClient) {
   }

  ngOnInit(): void {
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

  UpdateContestants(race, zipcode){

    this.submitContestants = true;
    this.contestants = race
    this.tempZipcode = zipcode;
    console.log(this.tempZipcode);
  }

  AddContestants(contestant){
    //@ts-ignore
    //var contestant = document.getElementById("inputContestant").Value
    console.log(contestant)
    this.http.get<any>(this.urlTeam + contestant).subscribe({
      next: result => this.crews = result,
      error: err => console.log(err),
    });

    console.log(this.crews)

    this.http.put("/contestants/" + this.tempZipcode, this.crews).subscribe();

  }

  DeleteContestant(contestant){

  }
}
