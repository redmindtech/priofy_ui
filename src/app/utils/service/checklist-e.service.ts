import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ChecklistEService {
  baseUrl: string = "http://localhost:8080/checklistA";
  
  constructor(private httpClient: HttpClient) { }

  // Create new permit data
  public createchecklistE(data: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
      }),
    };

    return this.httpClient.post(this.baseUrl+('/ChecklistASave'), data, httpOptions);
  }
  public getchecklistE(): Observable<any> {
    return this.httpClient.get(this.baseUrl+('/last'));
  }
}