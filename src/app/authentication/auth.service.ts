import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment.development';
import { LoginApiResponse } from './auth.interface';
import { AuthEndPoints } from './auth.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
    console.log(environment.from);
  }

  loginWithEmailAndPassword(email: string, password: string): Observable<LoginApiResponse> {
    return this.http.post<LoginApiResponse>(environment.backendUrl + AuthEndPoints.Login, { email, password })
  }
}
