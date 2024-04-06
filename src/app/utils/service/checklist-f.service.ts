import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ChecklistFService {

  baseUrl: string = "http://localhost:8080/CheckListF";

  constructor(private httpClient: HttpClient) { }

  // Create new permit data
  public createchecklistF(data: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
      }),
    };

    return this.httpClient.post(this.baseUrl+('/CheckListFSave'), data, httpOptions);
  }
  public getchecklistF(): Observable<any> {
    return this.httpClient.get(this.baseUrl+('/last'));
  }
  updatePermitData(data: any): Observable<any> {
    console.log('data: ', data);
    console.log(data.userId);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    // Assuming data.userId exists
    return this.httpClient.put<any>(`${this.baseUrl}/${data.id}`, data, httpOptions);
  }
}
