import { Component, OnInit } from '@angular/core';
import { Observable, from } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'angular2-cookie';
import { RaceForm } from '../models/race-form';
import { Router } from '@angular/router';

@Component({
  selector: 'app-race-form',
  templateUrl: './race-form.component.html',
  styleUrls: ['./race-form.component.css']
})
export class RaceFormComponent implements OnInit {

  public model: RaceForm;
  public dateTimeBuilder: DateTimeBuilder;
  submitted = false;
  public initDate;
  urlRace = "http://localhost:3000/race";
  public dateTime;
  
  constructor(private http:HttpClient, private Cookie:CookieService, private router: Router) { 
    this.initDate = Date.now()
    this.dateTimeBuilder = new DateTimeBuilder("", 0, 0)
    this.model = new RaceForm(0, this.dateTime, false, false, "", "", [])
    
  }

  ngOnInit() {
    var cookie = this.Cookie.get("user");
    if(cookie == null){
      console.log("401 not authorized - No cookie found");
      this.router.navigate(['/admin-login'])
    }
  }

  SubmitRace(){
    this.dateTime = this.dateTimeBuilder.date + " " + this.dateTimeBuilder.hours + ":" + this.dateTimeBuilder.minutes
    this.model.fld_Date = this.dateTime;
    console.log(this.dateTime)
    this.submitted = true;
    console.log(this.model)
    this.http.post(this.urlRace, this.model).subscribe({
      next: result => console.log(result),
      error: err => console.log(err)
    });
  }

}

export class DateTimeBuilder{
  /**
   *
   */
  constructor(
    public date: string,
    public hours: number,
    public minutes: number,
  ) {
  }
}

