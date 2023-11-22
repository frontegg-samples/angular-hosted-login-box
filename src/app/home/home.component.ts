import { Component, OnInit } from '@angular/core';
import { ITeamUserRole } from '@frontegg/rest-api';
import { ContextHolder, FronteggAuthService } from '@frontegg/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.css' ]
})
export class HomeComponent implements OnInit {
  user?: any;


  constructor(private fronteggAuthService: FronteggAuthService) {
  }

  ngOnInit(): void {
    this.fronteggAuthService?.teamState$.subscribe((teamState) => {
      const newRoles: ITeamUserRole[] = teamState.roles.filter((role: ITeamUserRole) => role.name !== 'New');
      this.fronteggAuthService.setTeamState({ roles: newRoles });
    });

    this.fronteggAuthService?.user$.subscribe((user) => {
      this.user = user;
    });
  }

  loginWithRedirect(): void {
    this.fronteggAuthService.loginWithRedirect({ prompt: 'login' });
  }

  logOut(): void {
    const baseUrl = ContextHolder.getContext().baseUrl;
    window.location.href = `${baseUrl}/oauth/logout?post_logout_redirect_uri=${window.location}`;
  }


}
