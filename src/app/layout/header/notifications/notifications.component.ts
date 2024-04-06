import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NotificationService } from '@app/utils/service/notification.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent { 
  private onSubmitInterval: any;
  private addSubscription: Subscription | undefined;
  remainingValues: any;
  constructor(private fb: FormBuilder,  private apiService: NotificationService )
{}

ngOnInit(): void {

this.setupSubmitInterval();
}
setupSubmitInterval() {
  this.onSubmitInterval = setInterval(() => {
    console.log('onSubmitInterval: ', this.onSubmitInterval);
    this.add();
  }, 5* 1000); // 2 minutes in milliseconds
}

add() {
  this.apiService.getnotification().subscribe((response: any) => {
    console.log(response, 'checking');
    
    this.remainingValues = response.result;

    // Iterate through the values and check if any value is not null or empty
    Object.keys(this.remainingValues).forEach(key => {
      if (this.remainingValues[key]) {
        // If the value is not null or empty, patch it
        
        console.log('this.remainingValues[key]: ', this.remainingValues[key]);
      }
    });
  });
}

patchValue(value: any) {
  // Your patch logic here
}



}
