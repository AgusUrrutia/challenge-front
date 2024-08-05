import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly SESSION_COOKIE = 'userSession'; 
  apiUrl: string = "http://localhost:3000";

  constructor(private cookieService: CookieService, private http: HttpClient) {}

  login(formData: FormData): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })

    // headers: new HttpHeaders({
    //   'Accept': 'application/json'
    // })
    return this.http.post<any>(`${this.apiUrl}/challenge-au/auth/login`, formData)
    .pipe(
      tap((response: { token: string; name: string }) => {
      
        if (response.token && response.name) {
          const sessionData = {
            token: response.token,
            name: response.name
          };

          // Convertimos el objeto en una cadena JSON
          const sessionDataString = JSON.stringify(sessionData);

          // Guardamos el objeto JSON en la cookie
          this.cookieService.set(this.SESSION_COOKIE, sessionDataString, { 
            expires: 1, 
            secure: true,  
            sameSite: 'Lax',  
            path: '/'
          });
        }
      })
    );
  }
  // {
  //   headers: new HttpHeaders({
  //     'Accept': 'application/json'
  //   })
  // }
  register(formData: FormData): Observable<any> {
    console.log(formData);
    
    return this.http.post<any>(`${this.apiUrl}/challenge-au/auth/register`, formData).pipe(
      tap((response: { token: string; name: string }) => {
      
        if (response.token && response.name) {
          const sessionData = {
            token: response.token,
            name: response.name
          };
          console.log(sessionData.name);
          
          // Convertimos el objeto en una cadena JSON
          const sessionDataString = JSON.stringify(sessionData);

          // Guardamos el objeto JSON en la cookie
          this.cookieService.set(this.SESSION_COOKIE, sessionDataString, { 
            expires: 1, 
            secure: true,  
            sameSite: 'Lax',
            path: '/'
          });
        }
      })
    );
  }

  logout() {
    this.cookieService.delete(this.SESSION_COOKIE, '/');
  }

  isLoggedIn(): boolean {
    return this.cookieService.check(this.SESSION_COOKIE);
  }
  getSessionData(): { token: string; name: string } | null {
    const sessionDataString = this.cookieService.get(this.SESSION_COOKIE);
    
    if (sessionDataString) {
      // Convertimos la cadena JSON de nuevo en un objeto
      return JSON.parse(sessionDataString);
    }
    
    return null;
  }
}