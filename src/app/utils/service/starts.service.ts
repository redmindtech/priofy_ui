import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StartsService {
  // baseUrl: string = "http://ec2-3-141-10-144.us-east-2.compute.amazonaws.com:8080/startuprocedure";
  baseUrl: string ='http://localhost:8080/startuprocedure';
  

  constructor(private httpClient: HttpClient) { }
  public savestratuppage(data: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
      }),
    };

    return this.httpClient.post(this.baseUrl+('//startupprocedureSave'), data, httpOptions);
  }
}