import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
    console.log(environment.from);
  }

  loginWithEmailAndPassword(email: string, password: string): Observable<any> {
    
    // return this.http.post<any[]>("https://backend.safaryaara.com/get-user", data)
    return this.http.post<any[]>(environment.backendUrl + 'auth/login', { email, password })
  }
}
