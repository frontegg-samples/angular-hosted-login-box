import { Injectable, OnDestroy } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { FronteggAppService, FronteggAuthService } from '@frontegg/angular';
import { Subscription } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private fronteggAppService: FronteggAppService, private fronteggAuthService: FronteggAuthService) {
  }

  /**
   * Wait for loader to finish
   * @private
   */
  private waitForLoader() {
    return new Promise((resolve) => {
      const unsubscribe = this.fronteggAppService.isLoading$.subscribe((isLoading) => {
        if (!isLoading) {
          resolve(true);
          unsubscribe.unsubscribe();
        }
      });
    })
  }

  /**
   * Navigate to login page if user is not authenticated
   * @private
   */
  private async navigateToLoginIfNeeded(redirectUrl: string): Promise<boolean> {
    const { isAuthenticated } = this.fronteggAppService.fronteggApp.store.getState().auth;
    if (!isAuthenticated) {
      localStorage.setItem('FRONTEGG_AFTER_AUTH_REDIRECT_URL', redirectUrl);
      this.fronteggAuthService.loginWithRedirect({ prompt: 'login' })
      return false // prevent navigation
    }
    return true // activate navigation
  }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | boolean {
    const redirectUrl = state.url;
    const { isLoading } = this.fronteggAppService.fronteggApp.store.getState().auth;


    console.log("AuthGuard canActivate", isLoading, redirectUrl)
    // option 1
    // isLoading = false
    // check if user is authenticated

    // option 2
    // isLoading = true
    // wait for loader to be false and check is user is authenticated

    if (!isLoading) {
      // if showLoader false
      // check if user is authenticated
      return this.navigateToLoginIfNeeded(redirectUrl)
    }

    // wait for loader to finish and then check if user is authenticated
    return new Promise<boolean>(async (resolve) => {
      await this.waitForLoader()
      const activated = await this.navigateToLoginIfNeeded(redirectUrl)
      resolve(activated)
    })
  }


}


