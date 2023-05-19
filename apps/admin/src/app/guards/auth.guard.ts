// /* eslint-disable @typescript-eslint/no-unused-vars */
// import { Injectable } from "@angular/core";
// import {
//   CanActivate,
//   ActivatedRouteSnapshot,
//   RouterStateSnapshot,
//   UrlTree,
//   CanActivateChild,
//   Router,
// } from "@angular/router";
// import { Observable } from "rxjs";
// import { AuthService } from "../dashboard/shared/services/auth.service";

// @Injectable({ providedIn: "root" })
// export class AuthGuard implements CanActivate, CanActivateChild {
//   constructor(
//     private readonly router: Router,
//     private readonly authService: AuthService
//   ) {}

//   canActivateChild(
//     childRoute: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ):
//     | boolean
//     | UrlTree
//     | Observable<boolean | UrlTree>
//     | Promise<boolean | UrlTree> {
//     const isAuth = this.authService.isAuthenticated;
//     if (!isAuth) {
//       this.router.navigate(["login"]);
//     }
//     return isAuth;
//   }

//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ):
//     | Observable<boolean | UrlTree>
//     | Promise<boolean | UrlTree>
//     | boolean
//     | UrlTree {
//     const isAuth = this.authService.isAuthenticated;
//     if (!isAuth) {
//       this.router.navigate(["login"]);
//     }
//     return isAuth;
//   }
// }

import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../dashboard/shared/services/auth.service";

export const AuthGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated) {
    return true;
  }

  // Redirect to the login page
  return router.parseUrl("/login");
};
