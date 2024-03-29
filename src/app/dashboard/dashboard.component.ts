import { Component, OnInit } from '@angular/core';
import { ITeamUserRole } from '@frontegg/rest-api';
import { ContextHolder, FronteggAuthService } from '@frontegg/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
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

  loginToTenant1(): void {
    this.loginWithRedirectToTenant('main');
  }

  loginToTenant2(): void {
    this.loginWithRedirectToTenant('608bd4cb-edd4-4f71-9e17-e801c4241256');
  }

  private loginWithRedirectToTenant(tenantId: string): void {
    console.log(`Logging in to Tenant ${tenantId}`);

    this.fronteggAuthService.loginWithRedirect({
      tenantId: tenantId,
      prompt: 'login'
    });
  }

  logOut(): void {
    const baseUrl = ContextHolder.getContext().baseUrl;
    window.location.href = `${baseUrl}/oauth/logout?post_logout_redirect_uri=${window.location.href}`;
  }


}
