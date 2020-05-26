import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Administrators } from '../models/administrators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  
  public model:Administrators; 
  /**
   *
   */
  constructor(private http:HttpClient) {
    

  }

  //Call to test our node.js Server
  SeeAll(){
    this.http.get<Administrators[]>('http://localhost:3000/gps').subscribe((res)=> {
      console.log(res)
    });
  }

}
