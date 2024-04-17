import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-swapapproval',
  templateUrl: './swapapproval.component.html',
  styleUrls: ['./swapapproval.component.css']
})
export class SwapapprovalComponent implements OnInit {
  yesColor: string = ''; // Color for 'Yes' button
  noColor: string = ''; // Color for 'No' button
  currentDateAndTime: string = ''; // Current date and time
  

  constructor() { }

  ngOnInit(): void {
    // Call the function to set the current date and time when the component initializes
    this.setCurrentDateAndTime();
  }

  // Function to set the current date and time
  setCurrentDateAndTime(): void {
    const currentDate = new Date();
    // Format the date as needed (e.g., DD/MM/YYYY)
    const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
    // Format the time as needed (e.g., HH:MM:SS)
    const formattedTime = `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
    // Combine date and time
    this.currentDateAndTime = `${formattedDate} ${formattedTime}`;
  }
}
