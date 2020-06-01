import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { AgmCoreModule } from '@agm/core';
import { MapComponent } from './map/map.component';
import { SignUpAdminComponent } from './sign-up-admin/sign-up-admin.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { CrewSignupComponent } from './crew-signup/crew-signup.component';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    MapComponent,
    SignUpAdminComponent,
    SignUpComponent,
    AdminLoginComponent,
    CrewSignupComponent
    
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'map', component: MapComponent },
      { path: 'sign-up', component: SignUpComponent },
      { path: 'crew-signup', component: CrewSignupComponent},
      { path: 'admin-login', component: AdminLoginComponent},
    ]),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCnnppP8trPwzu-5dOv6KUoW6np4nExUOg'
    }),
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
