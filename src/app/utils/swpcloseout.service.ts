import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class SwpcloseoutService {
  baseUrl1: string ='http://localhost:8080/closeOut1';
  baseUrl2: string ='http://localhost:8080/closeOut2';
  baseUrl3: string ='http://localhost:8080/closeOut3';
  baseUrl4: string ='http://localhost:8080/closeOut4';


  constructor(private httpClient: HttpClient) { }

  //save Api saveswpcloseout1
  public saveswpcloseout1(data: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
      }),
    };

    return this.httpClient.post(this.baseUrl1+('/CloseOut1Save'), data, httpOptions);
  }

//save Api saveswpcloseout2
public saveswpcloseout2(data: any): Observable<any> {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    }),
  };

  return this.httpClient.post(this.baseUrl2+('/CloseOut2Save'), data, httpOptions);
}

//save Api saveswpcloseout2
public saveswpcloseout3(data: any): Observable<any> {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    }),
  };

  return this.httpClient.post(this.baseUrl3+('/CloseOut3Save'), data, httpOptions);
}

//save Api saveswpcloseout2
public saveswpcloseout4(data: any): Observable<any> {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    }),
  };

  return this.httpClient.post(this.baseUrl4+('/CloseOut4Save'), data, httpOptions);
}

  // updateswprequest(data: any): Observable<any> {
  //   console.log('data: ', data);
  //   console.log(data.id);
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //     })
  //   };

  //   // Assuming data.userId exists
  //   return this.httpClient.put<any>(`${this.baseUrl}/${data.id}`, data, httpOptions);
  // }
  // //getbyid
  // public getswprequestById(id: string): Observable<any> {
  //   return this.httpClient.get(`${this.baseUrl}/${id}`);
  // }
}