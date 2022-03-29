import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserListResponse } from '../interfaces/user-list-response';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = environment.backendUrl;

  constructor(private http: HttpClient, private authService: AuthService) {}

  listUser(page: number): Observable<UserListResponse> {
    const url = this.apiUrl + '/profile/' + page;

    let headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getAuthToken()}`,
    });

    return this.http.get<UserListResponse>(url, { headers });
  }
}
