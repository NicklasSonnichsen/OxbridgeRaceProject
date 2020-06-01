import { Component, OnInit } from '@angular/core';
import { Administrators } from '../models/administrators';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { error } from 'protractor';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  public model: Administrators;
  /**
   *
   */
  private httpOptions = {
    headers: new Headers({
      'Accept': 'text/html, application/xhtml+xml, */*',
      'Content-Type': 'application/x-www-form-urlencoded'
    }),
    responseType: 'text'
  };

  constructor(private http: HttpClient) {
    this.model = new Administrators('', '', '', '');
  }

  ngOnInit(): void {
    
  }

  submitted = false;
  //login to backend
  Login(){
  this.submitted = true;
    console.log("Submit virker")
    console.log("Email = " + this.model.fld_Email)
    this.http.post<Administrators>('http://localhost:3000/login', {
      "fld_Email": this.model.fld_Email,
      "fld_Password": this.model.fld_Password
    }).subscribe({
      next: data => console.log(data),  
      error: error => console.error('There was an error with login!', error)
    })
    this.model.fld_Email = "";
    this.model.fld_Password = "";
  }

  TestToken() {
    this.http.get<Administrators>('http://localhost:3000/eventcoordinator').subscribe({
      next: data => this.model = data,
      error: error => console.log("Test cookie error!: ", error)});
  }

  TestSearchToken(){
    this.http.get<Administrators>('http://localhost:3000/eventcoordinator/test')
      .subscribe({
        next: result => console.log(result),
        error: err => console.log(err)
      });
  }
  TestSet() {
    this.http.get("http://localhost:3000/set", { responseType: 'text' })
      .subscribe({
        next: result => console.log(result),
        error: err => console.log(err)
      });
  }
  TestGet() {
    this.http.get("http://localhost:3000/getall", { responseType: 'text' })
      .subscribe({
        next: result => console.log(result),
        error: err => console.log(err)
      });
  }
}
