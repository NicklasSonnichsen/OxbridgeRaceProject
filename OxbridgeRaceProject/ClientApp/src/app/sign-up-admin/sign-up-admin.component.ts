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
    console.log("FirstNAme er dette: " + this.model.firstName)
    this.http.post<Administrators>('http://localhost:3000/admin', {
      "fld_AdminName": this.model.firstName,
      "fld_AdminLastName": this.model.lastName,
      "fld_Email": this.model.email,
      "fld_Password": this.model.password
    }).subscribe({
      next: data => this.model = data,  
      error: error => console.error('There was an error!', error)
    })
  }


}
