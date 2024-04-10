import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: any
  formattedDate: string;
  addbutton: boolean = false;
  constructor(private authService: AuthService,
    private router: Router,) {
  }

  ngOnInit(): void {
    // this.authService.currentUser.subscribe(user => {
    //   this.user = user;
    // })
    // this.authService.getUser()
    // console.log(this.authService.currentUserValue)
    const currentDate: Date = new Date();

// Format the date as needed (e.g., DD/MM/YYYY)
this.formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
  }
viewselected(){
  this.router.navigate(['/main/mainmenu']);
}
addItem(): void {

  setTimeout(() => {
this.addbutton = true;
  
}, 500);
}
}
