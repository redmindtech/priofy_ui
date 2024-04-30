import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProcessingswpService {
  baseUrl: string ='http://localhost:8080';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    }),
  };

  constructor(private httpClient: HttpClient) { }

  public savepreparation(data: any): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + '/preparation1/Preparation1Save', data, this.httpOptions);
  }
  
  public savepreparation1(data: any): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + '/preparation2/Preparation2Save', data, this.httpOptions);
  }

  // Other methods...
}
