import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Role } from '@app/model/Role';
import { User } from '@app/model/User';
import { environment } from '@environments/environment';
import { catchError, map, Observable, of } from 'rxjs';
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedUser: any;

  constructor(private http: HttpClient) { }

  isLoggedIn$(): Observable<boolean> {
    return this.getCurrentUser().pipe(
      map(user => !!user),
      catchError(() => of(false))
    );
  }


  getCurrentUser(): Observable<any> {
    if (this.loggedUser) {
      return of(this.loggedUser);
    } else {
      return this.http.get<User>(`${environment.apiUrl}/api/auth/user`)
        .pipe(tap(user => this.loggedUser = user));
    }
  }

  login(credential: Credential): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/auth/login`, credential, {
      withCredentials: true
    }).pipe(tap(data => this.loggedUser = data))
  }


  register(body: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/auth/register`, body, {
      withCredentials: true
    })
  }

  logout(): void {
    this.http.post(`${environment.apiUrl}/api/auth/logout`, {}, { withCredentials: true }).toPromise()
    this.loggedUser = undefined;
  }

  hasRole(role: Role): Observable<boolean> {
    return this.getCurrentUser().pipe(
      map(user => user.roles.indexOf(role) !== -1),
      catchError(() => of(false))
    );
  }
}
