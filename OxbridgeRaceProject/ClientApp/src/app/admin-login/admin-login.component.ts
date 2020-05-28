import { Component, OnInit } from '@angular/core';
import { Administrators } from '../models/administrators';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

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
      next: data => this.model = data,  
      error: error => console.error('There was an error!', error)
    })
    this.model.fld_Email = "";
    this.model.fld_Password = "";
  }
}
