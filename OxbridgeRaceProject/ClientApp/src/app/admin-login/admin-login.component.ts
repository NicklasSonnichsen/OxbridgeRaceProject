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
  public loginEmail = "";
  public loginPassword = "";

  public LoginFormGroup = new FormGroup({});

  /**
   *
   */
  constructor(private http: HttpClient) {

    this.model = new Administrators("","",this.loginEmail,this.loginPassword)
  }

  ngOnInit(): void {
    
  }

  //login to backend
  Login(admin: Administrators): Observable<Administrators> {
    return this.http.post<Administrators>('http://localhost:3000/login', Administrators)
    .pipe();
  };
}
