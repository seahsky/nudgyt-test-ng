import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user';
import { AuthResponse } from '../interfaces/auth-response';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { RegisterPayload } from '../interfaces/register-payload';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginPayload } from '../interfaces/login-payload';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = environment.backendUrl;
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(
    private http: HttpClient,
    private jwtHelperService: JwtHelperService,
    private router: Router
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(
      this.jwtHelperService.decodeToken<User>(
        localStorage.getItem('currentUserToken') || ''
      )
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public getAuthToken(): string {
    let tokenInStorage: string = localStorage.getItem('currentUserToken') || '';

    let isTokenInvalid =
      tokenInStorage == null ||
      this.jwtHelperService.isTokenExpired(tokenInStorage);
    if (isTokenInvalid) {
      this.logout();
    }
    return tokenInStorage;
  }

  login(payload: LoginPayload): Observable<AuthResponse> {
    const url = this.apiUrl + '/auth/login';
    return this.http.post<AuthResponse>(url, payload).pipe(
      map((response) => {
        if (response.token) {
          localStorage.setItem('currentUserToken', response.token);
          let currentUser = this.jwtHelperService.decodeToken(response.token);
          this.currentUserSubject.next(currentUser);
          return currentUser;
        }
      })
    );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('currentUserToken');
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['auth/login']);
  }

  register(payload: RegisterPayload): Observable<AuthResponse> {
    const url = this.apiUrl + '/auth/register';
    return this.http.post<AuthResponse>(url, payload).pipe(
      map((response) => {
        if (response.token) {
          localStorage.setItem('currentUserToken', response.token);
          let currentUser = this.jwtHelperService.decodeToken(response.token);
          this.currentUserSubject.next(currentUser);
          return currentUser;
        }
      })
    );
  }
}
