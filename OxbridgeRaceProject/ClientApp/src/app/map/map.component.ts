import { Component } from '@angular/core';
import { GpsLocation } from '../models/gps-location';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent{
  latitude = 54.90926;
  longitude = 9.80737;
  pinLattitude;
  pinLongitude;

  public model: GpsLocation;
  constructor(private http: HttpClient) {

    this.http.get<GpsLocation[]>('http://localhost:3000/gps').subscribe((res) => {
      console.log(res)
    });

    
  }

  onChooseLocation(event)
  {
    console.log(event);
  }



}
