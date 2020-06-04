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

  public crews: Array<CrewForm[]>; 
  public races: Array<RaceForm>;
  public searchedCrew: string;
  public searchedRace: string;
  raceSubmitted = false;
  crewSubmitted = false;

  ChangeInfoRace = false;
  ChangeInfoTeam = false;

  public urlTeam = 'http://localhost:3000/crew/';
  public urlRace = 'http://localhost:3000/race/';

  constructor(private http: HttpClient) {
   }

  ngOnInit(): void {
  }

  InfoCrew(e){
    console.log(e);

    this.ChangeInfoTeam = true;
  }

  InfoRace(e){
    this.races = e.races;
    console.log(this.races);

    this.ChangeInfoRace = true;
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

}