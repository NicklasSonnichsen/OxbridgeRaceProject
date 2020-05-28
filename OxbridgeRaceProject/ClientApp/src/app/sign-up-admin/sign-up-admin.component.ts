import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Administrators } from '../models/administrators'

@Component({
  selector: 'app-sign-up-admin',
  templateUrl: './sign-up-admin.component.html',
  styleUrls: ['./sign-up-admin.component.css']
})
export class SignUpAdminComponent implements OnInit {
  public model: Administrators;
  constructor(private http: HttpClient) {
    this.model = new Administrators('Martin', 'Iversen', 'test@myMail.com', '123456789');
  }

  ngOnInit() {
  }
  submitted = false;

  onSubmit() {
    this.submitted = true;
    console.log("Submit virker")
    console.log("First name = " + this.model.fld_FirstName)
    this.http.post<Administrators>('http://localhost:3000/eventcoordinator', {
      "fld_AdminName": this.model.fld_FirstName,
      "fld_AdminLastName": this.model.fld_LastName,
      "fld_Email": this.model.fld_Email,
      "fld_Password": this.model.fld_Password
    }).subscribe({
      next: data => this.model = data,  
      error: error => console.error('There was an error!', error)
    })
  }


}
