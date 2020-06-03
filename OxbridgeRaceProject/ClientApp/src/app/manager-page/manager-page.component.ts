import { Component, OnInit } from '@angular/core';
import { CrewForm } from '../models/CrewForm';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ICrew{
  fld_CrewName: string, 
  fld_Captain: string, 
  fld_Members: number, 
  fld_Position: number, 
  fld_Password: string, 
  fld_Email: string, 
  fld_Category: string
} 

@Component({
  selector: 'app-manager-page',
  templateUrl: './manager-page.component.html',
  styleUrls: ['./manager-page.component.css']
})


export class ManagerPageComponent implements OnInit {

  public crews: CrewForm[];
  public searchedCrew: string;
  public searchedRace: string;
  // displayedColumns: string[] = ['fld_CrewName', 'fld_Captain'];
  // dataSource = crews;
  public url = 'http://localhost:3000/crew/';
  public urlRace = 'http://localhost:3000/race/';

  constructor(private http: HttpClient) {
    
   }

  ngOnInit(): void {
  }


  SearchTeam(){
    this.searchedCrew =((document.getElementById("CrewSearch") as HTMLInputElement).value);
    console.log(this.url + this.searchedCrew);
    const teamURL = this.url + this.searchedCrew;
    this.http.get(teamURL)
    .subscribe((response: CrewForm[]) => {                           //next() callback
      console.log('response received')
      this.crews = response; 
    },
    (error) => {                              //error() callback
      console.error('Request failed with error')
    },
    () => {                                   //complete() callback
      console.error('Request completed')      //This is actually not needed 
    })
      
    
    // this.searchedCrew =((document.getElementById("CrewSearch") as HTMLInputElement).value);
    // this.http.get<ICrew>("http://localhost:3000/crew/" + this.searchedCrew).subscribe(result =>{
      
    //   console.log(result.fld_CrewName);

    //   this.crews.push(new CrewForm(result.fld_CrewName, result.fld_Captain, result.fld_Email, result.fld_Password, result.fld_Members, result.fld_Category));
    // });   
  }

  SearchRace(){
    this.searchedRace =((document.getElementById("RaceSearch") as HTMLInputElement).value);
    console.log(this.urlRace + this.searchedRace);
    const teamURL = this.urlRace + this.searchedCrew;
    this.http.get(teamURL)
    .subscribe((response: CrewForm[]) => {                           //next() callback
      console.log('response received')
      this.crews = response; 
    },
    (error) => {                              //error() callback
      console.error('Request failed with error')
    },
    () => {                                   //complete() callback
      console.error('Request completed')      //This is actually not needed 
    })
  }

}