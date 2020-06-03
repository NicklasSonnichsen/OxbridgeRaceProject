import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { AgmCoreModule } from '@agm/core';
import { MapComponent } from './map/map.component';
import { SignUpAdminComponent } from './sign-up-admin/sign-up-admin.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { CrewSignupComponent } from './crew-signup/crew-signup.component';
import { ManagerPageComponent } from './manager-page/manager-page.component';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    MapComponent,
    SignUpAdminComponent,
    AdminLoginComponent,
    CrewSignupComponent,
    ManagerPageComponent
    
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'map', component: MapComponent },
      { path: 'crew-signup', component: CrewSignupComponent},
      { path: 'admin-signup', component: SignUpAdminComponent},
      { path: 'admin-login', component: AdminLoginComponent},
      { path: 'manager-page', component: ManagerPageComponent}
    ]),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCnnppP8trPwzu-5dOv6KUoW6np4nExUOg'
    }),
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
