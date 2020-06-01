import { Component, OnInit } from '@angular/core';
import { CrewForm } from '../models/CrewForm';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-crew-signup',
  templateUrl: './crew-signup.component.html',
  styleUrls: ['./crew-signup.component.css']
})
export class CrewSignupComponent implements OnInit {

  public model: CrewForm;
  submitted = false;

  constructor(private http: HttpClient) {
    this.model = new CrewForm('', '', '', '', 0, "");
  }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.submitted);
    this.submitted = true;
    console.log(this.submitted);
    if (this.submitted == true) {
      this.Submit();
    }
  }


  Submit() {
    console.log("Submit virker")
    this.http.post<CrewForm>('http://localhost:3000/crew', {
      "fld_CrewName": this.model.fld_CrewName,
      "fld_Captain": this.model.fld_Captain,
      "fld_Email": this.model.fld_Email,
      "fld_Password": this.model.fld_Password,
      "fld_Members": this.model.fld_Members,
      "fld_Category": this.model.fld_Category,
      observe: "response"

    }).subscribe(response => {
      console.log(response);
      console.log(this.model.fld_CrewName);
    })
  }
}
