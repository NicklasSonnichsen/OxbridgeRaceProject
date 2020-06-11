import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Administrators } from '../models/administrators';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [NgbCarousel]
})
export class HomeComponent {

  //images = [944, 1011, 984].map((n) => '/assets');
  images = [384, 598, 973].map((n) => `https://picsum.photos/id/${n}/900/500`);
  constructor(private http: HttpClient, config: NgbCarousel) {

    config.interval = 500
    config.pauseOnHover = true

  }

  //Call to test our node.js Server
 

}
