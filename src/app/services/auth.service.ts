import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'// Esto hace que Angular cree una sola instancia (Singleton)
})
export class AuthService {
  private apiUrl = 'http://localhost:9090/api/auth/login'

  constructor(private http: HttpClient) { }

  login(credentials: {username: string, password: string}) : Observable<any>{
    return this.http.post<any>(this.apiUrl, credentials);
  }
  logout(): void {
    localStorage.removeItem('token');
  }
  isAutheticated(): boolean{
    return !!localStorage.getItem('token');
  }
  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
