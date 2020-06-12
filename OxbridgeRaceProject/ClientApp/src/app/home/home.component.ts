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

  // our images used in the carousel on the homePage
  images = [384, 598, 973].map((n) => `https://picsum.photos/id/${n}/900/500`);
  constructor(private http: HttpClient, config: NgbCarousel) {
    // how long it should wait before switching images in ms 
    config.interval = 500
    // making the carousel pause when hovering over pictures
    config.pauseOnHover = true

  }

 

}
