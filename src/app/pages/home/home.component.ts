import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: any
  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    // this.authService.currentUser.subscribe(user => {
    //   this.user = user;
    // })
    // this.authService.getUser()
    // console.log(this.authService.currentUserValue)
  }

}
