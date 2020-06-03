import { Component, OnInit } from '@angular/core';
import { CrewForm } from '../models/CrewForm';
import { HttpClient } from '@angular/common/http';
import { ICrew } from '../manager-page/ICrew';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-manager-page',
  templateUrl: './manager-page.component.html',
  styleUrls: ['./manager-page.component.css']
})



export class ManagerPageComponent implements OnInit {

  public crews: CrewForm[];
  public searchedCrew: String;
  

  constructor(private http: HttpClient) {
    this.crews = new Array();
   }

  ngOnInit(): void {
    this.SearchTeam();
  }


  SearchTeam(){
    this.searchedCrew =((document.getElementById("CrewSearch") as HTMLInputElement).value);
    console.log(this.searchedCrew);
    this.http.get<CrewForm>('http://localhost:3000/crew/' + this.searchedCrew).subscribe((res )=>{
      console.log(res.fld_CrewName.toString());
      
      this.crews.push(new CrewForm(res.fld_CrewName, res.fld_Captain,res.fld_Email, res.fld_Password, res.fld_Members, res.fld_Category));
    })
    
    // this.searchedCrew =((document.getElementById("CrewSearch") as HTMLInputElement).value);
    // this.http.get<ICrew>("http://localhost:3000/crew/" + this.searchedCrew).subscribe(result =>{
      
    //   console.log(result.fld_CrewName);

    //   this.crews.push(new CrewForm(result.fld_CrewName, result.fld_Captain, result.fld_Email, result.fld_Password, result.fld_Members, result.fld_Category));
    // });   
  }

}
