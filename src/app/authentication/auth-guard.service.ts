import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { environment } from '../../environments/environment.development';
import { map } from 'rxjs/internal/operators/map';
import { catchError } from 'rxjs/internal/operators/catchError';
import { of } from 'rxjs/internal/observable/of';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private http: HttpClient, private router: Router) {
    // super()
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<any> {
    // console.log(route, state);
    if (localStorage.getItem('token')) {
      return this.http
        .get<any>(environment.backendUrl + 'verify-jwt-token', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          }
        })
        .pipe(map(JwtVerifiedTokenData => {
          if (JwtVerifiedTokenData.isJwttokenValid) {
            this.router.navigate(['/home']);
          }
          else {
            this.router.navigate(['/login']);
          }
          return JwtVerifiedTokenData.isJwttokenValid
        }),
          catchError((c) => {
            this.router.navigate(['/login']);
            return of(false);
          })
        )
        .toPromise();
    } else {
      this.router.navigate(['/login']);
      return Promise.reject(false);
    }
  }
}
