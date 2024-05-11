import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class SwapapprovalService {

 
  baseUrl1: string ='http://localhost:8766/approval1';
  baseUrl2: string ='http://localhost:8766/approval2';
  constructor(private httpClient: HttpClient) { }



  public saveswapapproval1(data: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
      }),
    };

    return this.httpClient.post(this.baseUrl1+('/Approval1Save'), data, httpOptions);
  }

  public saveswapapproval2(data: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
      }),
    };

    return this.httpClient.post(this.baseUrl2+('/Approval2Save'), data, httpOptions);
  }

  updateswpapproval1(data: any): Observable<any> {
    console.log('data: ', data);
    console.log(data.safeworkpermitRequest_id);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    // Assuming data.userId exists
    return this.httpClient.put<any>(`${this.baseUrl1}/${data.id}`, data, httpOptions);
  }


  updateswpapproval2(data: any): Observable<any> {
    console.log('data: ', data);
    console.log(data.safeworkpermitRequest_id);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    // Assuming data.userId exists
    return this.httpClient.put<any>(`${this.baseUrl2}/${data.id}`, data, httpOptions);
  }
  
}