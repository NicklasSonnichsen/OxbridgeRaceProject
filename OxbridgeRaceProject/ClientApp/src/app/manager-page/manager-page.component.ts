import { Component, OnInit } from '@angular/core';
import { CrewForm } from '../models/CrewForm';
import { RaceForm } from '../models/race-form'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-manager-page',
  templateUrl: './manager-page.component.html',
  styleUrls: ['./manager-page.component.css']
})


export class ManagerPageComponent implements OnInit {

  public crews: CrewForm[];
  public races: RaceForm[];
  public searchedCrew: string;
  public searchedRace: string;
  raceSubmitted = false;
  crewSubmitted = false;

  public urlTeam = 'http://localhost:3000/crew/';
  public urlRace = 'http://localhost:3000/race/';

  constructor(private http: HttpClient) {
    
   }

  ngOnInit(): void {
  }


  SearchTeam(){
    this.crewSubmitted = true
    this.raceSubmitted = false;
    this.searchedCrew = ((document.getElementById("CrewSearch") as HTMLInputElement).value);
    console.log(this.urlTeam + this.searchedCrew);
    const teamURL = this.urlTeam + this.searchedCrew;
    this.http.get<CrewForm[]>(teamURL)
    .subscribe({
      next: result => this.crews = result,
      error: err => console.log(err) 
    // },
    // (error) => {                              //error() callback
    //   console.error('Request failed with error')
    // },
    // () => {                                   //complete() callback
    //   console.error('Request completed')      //This is actually not needed 
    // })
      
    
    // this.searchedCrew =((document.getElementById("CrewSearch") as HTMLInputElement).value);
    // this.http.get<ICrew>("http://localhost:3000/crew/" + this.searchedCrew).subscribe(result =>{
      
    //   console.log(result.fld_CrewName);

    //   this.crews.push(new CrewForm(result.fld_CrewName, result.fld_Captain, result.fld_Email, result.fld_Password, result.fld_Members, result.fld_Category));
    // });   
  });
}

  SearchRace(){
    this.raceSubmitted = true;
    this.crewSubmitted = false;

    this.searchedRace = ((document.getElementById("RaceSearch") as HTMLInputElement).value);
    console.log(this.urlRace + this.searchedRace);
    const raceURL = this.urlRace + this.searchedRace;
    this.http.get(raceURL)
    .subscribe((response: RaceForm[]) => {
      console.log('response received')
      this.races = response; 
    },
    (error) => {                              //error() callback
      console.error('Request failed with error')
    },
    () => {                                   //complete() callback
      console.error('Request completed')      //This is actually not needed 
    })
  }

}