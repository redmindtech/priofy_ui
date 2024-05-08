import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://18.117.156.141:8766/projectMain';

// private apiUrl='http://localhost:8080//projectMain'
  constructor(private http: HttpClient) { }

  login(credentials: { username: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap(response => {
          // Handle successful login, e.g., store user information in local storage
          localStorage.setItem('currentUser', JSON.stringify(response.user));
          // You might want to store the token if using JWT
          localStorage.setItem('token', response.token);
        }),
        catchError(error => {
          // Handle login error
          console.error('Login error:', error);
          return of(false); // Return observable with false value indicating login failure
        })
      );
  }

  logout(): void {
    // Clear user information from local storage upon logout
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    // Check if user is logged in by verifying the presence of user information in local storage
    return !!localStorage.getItem('currentUser');
  }
}
