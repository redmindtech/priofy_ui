import { Component, OnInit } from '@angular/core';
// import {AppService} from '@services/app.service';
import { DateTime } from 'luxon';
import { AuthService } from '@app/service/auth.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css']
})
export class UserMenuComponent implements OnInit {
  public user: any;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    // this.user = this.appService.user;
    this.user = {
      picture: undefined,
      email: 'user@email.com',
      createdAt: '1987-11-04'
    }
  }

  logout() {
    this.authService.logout()
  }

  formatDate(date: string) {
    return DateTime.fromISO(date)
      .reconfigure({ outputCalendar: "buddhist" })
      .setLocale('th')
      .toFormat('dd LLL yyyy')
  }
}
