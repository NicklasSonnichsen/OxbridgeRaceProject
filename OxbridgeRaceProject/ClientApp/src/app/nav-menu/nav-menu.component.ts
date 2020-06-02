import { Component } from '@angular/core';
import { Administrators } from '../models/administrators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;
  public model: Administrators;

  constructor(private http: HttpClient) {
    this.model = new Administrators('', '', '', '');
  }
  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  LogOut() {

    localStorage.clear();

    this.http.get<Administrators>('http://localhost:3000/logout').subscribe({
      next: data => console.log(data),
      error: data => console.log(data)
    });
  }


}
