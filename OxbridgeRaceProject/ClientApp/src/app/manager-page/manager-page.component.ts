import { Component, OnInit } from '@angular/core';
import { CrewForm } from '../models/CrewForm';
import { RaceForm } from '../models/race-form';
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

  UpdateContestants(race){

    this.submitContestants = true;

    race.forEach(element => {
      this.contestants = element;
      console.log(this.contestants)
    });

    
    console.log(this.contestants)
  }

  AddContestants(race){

  }
}

export class Contestants{
  public fld_CrewName: string;
  public fld_Captain: string;
  public fld_Members: number;
  public fld_Category: string;
}