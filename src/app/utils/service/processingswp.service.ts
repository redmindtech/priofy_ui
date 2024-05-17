import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProcessingswpService {
  baseUrl: string ='http://localhost:8766';
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

  public savepreparation2(data: any): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + '/preparation3/Preparation3Save', data, this.httpOptions);
  }

  public savepreparation21(data: any): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + '/preparation4/Preparation4Save', data, this.httpOptions);
  }
  public savepreparation3(data: any): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + '/preparation5/Preparation5Save', data, this.httpOptions);
  }
  public savepreparation4(data: any): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + '/preparation7/Preparation7Save', data, this.httpOptions);
  }
  public savepreparation5(data: any): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + '/preparation6List/Preparation6SaveList', data, this.httpOptions);
  }
  public savepreparation7(data: any): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + '/preparation8/Preparation8Save', data, this.httpOptions);
  }
  public savepreparation8(data: any): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + '/preparation9/Preparation9Save', data, this.httpOptions);
  }

  public savepreparation9(data: any): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + '/preparation10/Preparation10Save', data, this.httpOptions);
  }

  // Other methods...

  updateswprequest(data: any): Observable<any> {
    console.log('data: ', data);
    console.log(data.safeworkpermitRequest_id);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    // Assuming data.userId exists
    return this.httpClient.put<any>(`${this.baseUrl}/preparation1/${data.id}`, data, httpOptions);
  }

  updateswprequest1(data: any): Observable<any> {
    console.log('data: ', data);
    console.log(data.safeworkpermitRequest_id);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    // Assuming data.userId exists
    return this.httpClient.put<any>(`${this.baseUrl}/preparation2/${data.id}`, data, httpOptions);
  }

  updateswprequest2(data: any): Observable<any> {
    console.log('data: ', data);
    console.log(data.safeworkpermitRequest_id);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    // Assuming data.userId exists
    return this.httpClient.put<any>(`${this.baseUrl}/preparation3/${data.id}`, data, httpOptions);
  }
  updateswprequest21(data: any): Observable<any> {
    console.log('data: ', data);
    console.log(data.safeworkpermitRequest_id);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    // Assuming data.userId exists
    return this.httpClient.put<any>(`${this.baseUrl}/preparation4/${data.id}`, data, httpOptions);
  }
  updateswprequest3(data: any): Observable<any> {
    console.log('data: ', data);
    console.log(data.safeworkpermitRequest_id);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    // Assuming data.userId exists
    return this.httpClient.put<any>(`${this.baseUrl}/preparation5/${data.id}`, data, httpOptions);
  }
  updateswprequest4(data: any): Observable<any> {
    console.log('data: ', data);
    console.log(data.safeworkpermitRequest_id);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    // Assuming data.userId exists
    return this.httpClient.put<any>(`${this.baseUrl}/preparation7/${data.id}`, data, httpOptions);
  }
  updateswprequest5(data: any): Observable<any> {
    console.log('data for update5: ', data);
    console.log("safeid value in updae",data.items1[0].safeworkpermitRequest_id);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    // Assuming data.safeworkpermitRequest_id exists
    return this.httpClient.put<any>(`${this.baseUrl}/preparation6List//${data.items1[0].safeworkpermitRequest_id}`, data, httpOptions);
  }

  updateswprequest7(data: any): Observable<any> {
    console.log('data: ', data);
    console.log(data.safeworkpermitRequest_id);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    // Assuming data.userId exists
    return this.httpClient.put<any>(`${this.baseUrl}/preparation8/${data.id}`, data, httpOptions);
  }
  updateswprequest8(data: any): Observable<any> {
    console.log('data: ', data);
    console.log(data.safeworkpermitRequest_id);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    // Assuming data.userId exists
    return this.httpClient.put<any>(`${this.baseUrl}/preparation9/${data.id}`, data, httpOptions);
  }
  updateswprequest9(data: any): Observable<any> {
    console.log('data: ', data);
    console.log(data.safeworkpermitRequest_id);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    // Assuming data.userId exists
    return this.httpClient.put<any>(`${this.baseUrl}/preparation10/${data.id}`, data, httpOptions);
  }
  public getprocessswpById(id: string): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/fetchallbyId/${id}`);
  }
}
