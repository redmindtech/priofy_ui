import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  Routes
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserManagementUpdateComponent } from './update/user-management-update.component';
import { UserManagementComponent } from './user-management.component';
import { UserManagementService } from './service/user-management.service';

@Injectable({
  providedIn: 'root'
})
export class UserManagementResolver implements Resolve<boolean> {
  constructor(private userManagementService: UserManagementService) {

  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const id = route.params['login'];
    console.log('resolve')
    if (id) {
      return this.userManagementService.find(id);
    }
    return of({
      email: '',
      name: ''
    });
  }
}

export const userManagementRoute: Routes = [
  {
    path: '',
    component: UserManagementComponent,
    data: {
      defaultSort: 'id,asc',
    },
  },
  {
    path: 'new',
    component: UserManagementUpdateComponent,
    resolve: {
      user: UserManagementResolver,
    },
  },
  {
    path: ':login/edit',
    component: UserManagementUpdateComponent,
    resolve: {
      user: UserManagementResolver,
    },
  },
];
