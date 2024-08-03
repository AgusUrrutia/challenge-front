import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly SESSION_COOKIE_NAME = 'userSession'; 
  apiUrl: string = "";

  constructor(private cookieService: CookieService, private http: HttpClient) {}

  login(formData: FormData): Observable<any> | boolean{
    console.log("Llega");
    
    
    this.cookieService.set(this.SESSION_COOKIE_NAME, 'true', { 
          expires: 1, 
          secure: true,  
          sameSite: 'Lax',  
          path: '/'
        });
        
    return true;
    

    //FALTA IMPLEMENTAR
    return this.http.post<any>(this.apiUrl, formData,{
      headers: new HttpHeaders({
        'Accept': 'application/json'
      })
    });

    
  }

  logout() {
    this.cookieService.delete(this.SESSION_COOKIE_NAME, '/');
  }

  isLoggedIn(): boolean {
    return this.cookieService.check(this.SESSION_COOKIE_NAME);
  }
}