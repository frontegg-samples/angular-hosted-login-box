import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { FronteggAppModule, FronteggComponent } from '@frontegg/angular';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './not-found.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [ AppComponent, HomeComponent, DashboardComponent, NotFoundComponent ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,

    /** 1. Import Frontegg Module **/
    FronteggAppModule.forRoot(
      {
        contextOptions: {
          baseUrl: 'https://auth.loudapi.com',
          clientId: '93447df4-edcc-45e5-8664-9fb8c196cf44',
        },
        hostedLoginBox: true,
        authOptions: {
          hostedLoginOptions: {
            loadUserOnFirstLoad: true
          }
        }
      }
    ),
  ],

  /** 2. Add Frontetgg Component to your entryComponents **/
  entryComponents: [ FronteggComponent ],

  bootstrap: [ AppComponent ],
})
export class AppModule {
}
