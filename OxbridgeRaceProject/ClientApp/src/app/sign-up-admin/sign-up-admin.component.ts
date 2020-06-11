import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Administrators } from '../models/administrators'
import { Router } from '@angular/router'
import { CookieService } from 'angular2-cookie/core'

@Component({
  selector: 'app-sign-up-admin',
  templateUrl: './sign-up-admin.component.html',
  styleUrls: ['./sign-up-admin.component.css']
})
export class SignUpAdminComponent implements OnInit {
  public model: Administrators;

  constructor(private http: HttpClient, private Cookie: CookieService, private router:Router) {
    this.model = new Administrators('', '', '', '');
  }

  /**
   * Checks for cookies on page load
   */
  ngOnInit() {
    var cookie = this.Cookie.get("user");
    if (cookie == null) {
      console.log("401 not authorized - No cookie found");
      this.router.navigate(['/admin-login']);
    }
  }
  submitted = false;

  /**
   * Adds a new event coordinator to the Database
   */
  onSubmit() {
    this.submitted = true;
    console.log("Submit virker")
    console.log("First name = " + this.model.fld_FirstName)
    this.http.post<Administrators>('http://localhost:3000/eventcoordinator', {
      "fld_FirstName": this.model.fld_FirstName,
      "fld_LastName": this.model.fld_LastName,
      "fld_Email": this.model.fld_Email,
      "fld_Password": this.model.fld_Password
    }).subscribe({
      next: data => this.model = data,  
      error: error => console.error('There was an error!', error)
    })
  }


}
