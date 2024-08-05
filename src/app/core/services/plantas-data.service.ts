import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Planta } from '../../interfaces/planta';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlantasDataService {
  apiUrl: string = "http://localhost:3000";
  apiUrlPaises: string = "https://restcountries.com/v3.1/name/"
  
  constructor(private cookieService: CookieService, private http: HttpClient, private auth: AuthService) {}
  getAll(): Observable<any>{
    let headers = new HttpHeaders({
      'x-auth-token': this.getToken()
    });
    return this.http.get<any>(`${this.apiUrl}/challenge-au/planta/all`, { headers });
  }

  getCountrie(countryName: string): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrlPaises}${countryName}`);
  }
  private getToken(): string {
    return this.auth.getSessionData()?.token || "";
  }

}
