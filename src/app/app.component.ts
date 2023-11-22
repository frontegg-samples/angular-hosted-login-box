// File: app.component.ts

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FronteggAppService, FronteggAuthService, ContextHolder } from '@frontegg/angular';
import { ITeamUserRole } from '@frontegg/rest-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit, OnDestroy {
  isLoading = true;
  loadingSubscription?: Subscription;
  user?: any;

  constructor(
    private fronteggAppService: FronteggAppService,
    private fronteggAuthService: FronteggAuthService
  ) {
  }

  ngOnInit() {
    this.loadingSubscription = this.fronteggAppService.isLoading$.subscribe((isLoading) => (this.isLoading = isLoading));
  }

  ngOnDestroy(): void {
    this.loadingSubscription?.unsubscribe();
  }
}
