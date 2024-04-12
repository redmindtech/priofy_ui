import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ChecklistAService { 


  // baseUrl: string = "http://ec2-3-141-10-144.us-east-2.compute.amazonaws.com:8080/checklistA";
  baseUrl: string ='http://localhost:8080/checklistA';
  
  constructor(private httpClient: HttpClient) { }

  // Create new permit data
  public createchecklistA(data: any): Observable<any> {
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
  public getchecklist(): Observable<any> {
    return this.httpClient.get(this.baseUrl+('/last'));
  }
  // Update permit data
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
  getformdisable(id: any): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/formstatus/${id}`);
  }
}
