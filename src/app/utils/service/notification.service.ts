import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  update:string="http://localhost:8080/notification/accept-reject?"
  baseUrlA: string = "http://localhost:8080/checklistA";
  baseUrlB: string = "http://localhost:8080/checklistB";
  baseUrlC: string = "http://localhost:8080/checklistC";
  baseUrlD: string = "http://localhost:8080/ChecklistD";
  baseUrlE: string = "http://localhost:8080/CheckListE";
  baseUrlF: string = "http://localhost:8080/CheckListF";
//  baseUrl: string = "http://ec2-3-141-10-144.us-east-2.compute.amazonaws.com:8080/CheckListE";

// update:string="http://ec2-3-141-10-144.us-east-2.compute.amazonaws.com:8080/notification/accept-reject?"
// baseUrlA: string = "http://ec2-3-141-10-144.us-east-2.compute.amazonaws.com:8080/checklistA";
// baseUrlB: string = "http://ec2-3-141-10-144.us-east-2.compute.amazonaws.com:8080/checklistB";
// baseUrlC: string = "http://ec2-3-141-10-144.us-east-2.compute.amazonaws.com:8080/checklistC";
// baseUrlD: string = "http://ec2-3-141-10-144.us-east-2.compute.amazonaws.com:8080/ChecklistD";
// baseUrlE: string = "http://ec2-3-141-10-144.us-east-2.compute.amazonaws.com:8080/CheckListE";
// baseUrlF: string = "http://ec2-3-141-10-144.us-east-2.compute.amazonaws.com:8080/CheckListF";
  constructor(private httpClient: HttpClient) { }
 // Create new permit data
//  public savenotification(data: any): Observable<any> {
//   const httpOptions = {
//     headers: new HttpHeaders({
//       'Content-Type': 'application/json',
//       "Access-Control-Allow-Origin": "*",
//       "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
//       "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
//     }),
//   };

//   return this.httpClient.post(this.baseUrl+('/ChecklistASave'), data, httpOptions);
// }

savenotification(payload: any): Observable<any> {

  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
            
    })
  };
// http://localhost:8080/notification/accept-reject?checklistType="A"&objectName="oot_high_pressure_comment_status"&Id=4&action="accept"
  // Assuming data.userId exists
  return this.httpClient.put<any>(
    `${this.update}checklistType=${payload.checklistType}&objectName=${payload.objectName}&Id=${payload.id}&Action=${payload.Action}`,
    payload,
    httpOptions
)
};


public getnotificationA(): Observable<any> {
  return this.httpClient.get(this.baseUrlA+('/lastcomment'));
}
public getnotificationB(): Observable<any> {
  return this.httpClient.get(this.baseUrlB+('/lastcomment'));
}
public getnotificationC(): Observable<any> {
  return this.httpClient.get(this.baseUrlC+('/lastcomment'));
}
public getnotificationD(): Observable<any> {
  return this.httpClient.get(this.baseUrlD+('/lastcomment'));
}
public getnotificationE(): Observable<any> {
  return this.httpClient.get(this.baseUrlE+('/lastcomment'));
}
public getnotificationF(): Observable<any> {
  return this.httpClient.get(this.baseUrlF+('/lastcomment'));
}
}
