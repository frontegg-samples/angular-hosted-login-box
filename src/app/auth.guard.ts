import {Injectable, OnDestroy} from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import {FronteggAuthService} from "@frontegg/angular";
import {Subscription} from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate, OnDestroy {
  private isLoadingSubscription: Subscription | undefined;
  private isAuthenticatedSubscription: Subscription | undefined;

  constructor(private fronteggAuthService: FronteggAuthService) { }

  public ngOnDestroy(): void {
    this.isLoadingSubscription?.unsubscribe();
    this.isAuthenticatedSubscription?.unsubscribe();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.isLoadingSubscription = this.fronteggAuthService.isLoading$.subscribe((isLoading) => {
      if (isLoading) {
        return false;
      }

      this.isAuthenticatedSubscription = this.fronteggAuthService.isAuthenticated$.subscribe((isAuthenticated) => {
        if (!isAuthenticated) {
          this.fronteggAuthService.loginWithRedirect({ prompt: 'login' });
          return false;
        }

        return true;
      });

      return false;
    });

    return false;
  }
}
