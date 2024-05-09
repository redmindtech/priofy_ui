import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SwprequestService {

  baseUrl: string ='http://localhost:8080/safeworkpermitrequest';

  constructor(private httpClient: HttpClient) { }
  public saveswprequest(data: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
      }),
    };

    return this.httpClient.post(this.baseUrl+('/SafeworkpermitrequestSave'), data, httpOptions);
  }
  updateswprequest(data: any): Observable<any> {
    console.log('data: ', data);
    console.log(data.id);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    // Assuming data.userId exists
    return this.httpClient.put<any>(`${this.baseUrl}/${data.id}`, data, httpOptions);
  }
//fetchAll
  public fetchAllrequest(data:any):Observable<any>{
    console.log('data:',data);
    const httpOptions={
      headers:new HttpHeaders({
        'Content-Type':'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
      })
    };
    return this.httpClient.get<any>(this.baseUrl+('/fetchAll'));
  }
  //getbyid
  public getswprequestById(id: string): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/${id}`);
  }
  }