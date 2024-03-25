import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { createRequestOption } from '@app/core/request/request-util';
import { SearchWithPagination } from '../../../core/request/request.model';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {
  public resourceUrl = '/api/user';

  constructor(private http: HttpClient) { }

  query(req?: SearchWithPagination): Observable<any> {
    const options = createRequestOption(req);
    return this.http.get(this.resourceUrl, { params: options });
  }


  find(id: any): Observable<any> {
    return this.http.get(`${this.resourceUrl}/${id}`);
  }

}
