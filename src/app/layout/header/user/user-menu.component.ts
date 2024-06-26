import { Component, OnInit } from '@angular/core';
// import {AppService} from '@services/app.service';
import { DateTime } from 'luxon';
import { AuthService } from '@app/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css']
})
export class UserMenuComponent implements OnInit {
  public user: any;

  constructor(
    private authService: AuthService,private router: Router
  ) { }

  ngOnInit(): void {
    // this.user = this.appService.user;
    this.user = {
      picture: undefined,
      email: 'user@email.com',
      createdAt: '1987-11-04'
    }
  }

  async logout() {
    await this.authService.logout(); // Assuming logout() is an asynchronous function

    // Navigate to the login page
    this.router.navigateByUrl('/login').then(() => {
        // Once navigation is complete, refresh the page
        window.location.reload();
    });
}
  formatDate(date: string) {
    return DateTime.fromISO(date)
      .reconfigure({ outputCalendar: "buddhist" })
      .setLocale('th')
      .toFormat('dd LLL yyyy')
  }
}
