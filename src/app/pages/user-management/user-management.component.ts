import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  debounceTime,
  map,
  distinctUntilChanged,
  filter
} from "rxjs";
import { UserManagementDeleteDialogComponent } from './delete/user-management-delete-dialog.component';
import { UserManagementService } from './service/user-management.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  constructor(private modalService: NgbModal, private userManagementService: UserManagementService) {
    this.refreshUsers();
  }

  users = [
    { id: 11, name: 'Dr Nice', email: 'user1@email.com' },
    { id: 12, name: 'Narco', email: 'user2@email.com' },
    { id: 13, name: 'Bombasto', email: 'user2@email.com' },
    { id: 14, name: 'Celeritas', email: 'user2@email.com' },
  ];

  page = 1;
  pageSize = 4;
  collectionSize = this.users.length;
  isSearching = false;
  filter = new FormControl('');

  ngOnInit(): void {
    this.filter.valueChanges.pipe(

      // get value
      map((value: any) => {
        this.isSearching = true;
        console.log({ value, date: new Date() })
        // return event.target.value;
        return value;
      })
      // if character length greater then 2
      , filter(res => res.length > 2)

      // Time in milliseconds between key events
      , debounceTime(250)

      // If previous query is diffent from current   
      , distinctUntilChanged()

    ).subscribe((text: string) => {

      // this.searchGetCall(text).subscribe((res) => {
      //   console.log('res', res);
      //   this.isSearching = false;
      //   this.apiResponse = res;
      // }, (err) => {
      //   this.isSearching = false;
      //   console.log('error', err);
      // });
      // setTimeout(()=> {
      console.log({ text: 'time out ' + text, date: new Date() })
      this.userManagementService.query({
        query: text,
        page: 1,
        size: 5,
        sort: ['id,asc']
      })
        .subscribe({
          next: (res) => {
            console.log('res', res);
            this.isSearching = false;
            this.users = res
          },
          error: (err) => {
            console.log(err)

            this.isSearching = false;
            console.log('error', err);
          }
        })
      this.isSearching = false;
      // }, 2000)

    });
    this.loadAll();
  }


  refreshUsers() {
    // this.countries = COUNTRIES
    //   .map((country, i) => ({id: i + 1, ...country}))
    //   .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  deleteUser(user: any): void {
    const modalRef = this.modalService.open(UserManagementDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.user = user;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }

  loadAll(): void {
    // this.isLoading = true;
    this.userManagementService.query({
      query: '',
      page: 0,
      size: 5,
      sort: ['id,asc']
    }).subscribe({
      next: (res: any) => {
        console.log(res)
        this.users = res
      },
      error: (e) => console.log(e)
    }
    )
  }
}
