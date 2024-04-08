import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  regob: any; // Define regob property, replace 'any' with appropriate type if known
  unique_district_count: number; // Define unique_district_count property, replace 'number' with appropriate type if known
  barchat: any; // Define barchat property, replace 'any' with appropriate type if known
  addbutton: boolean = false;
  addbutton2: boolean = false;
  addbutton3: boolean = false;
  addbutton4: boolean = false;
  addbutton5: boolean = false;
  addbutton6: boolean = false;

  isClicked: boolean = false;

  constructor(private router: Router) {
    // Initialize properties if needed
    this.regob = ''; // Example initialization
    this.unique_district_count = 0; // Example initialization
    this.barchat = ''; // Example initialization
  }
  ngOnInit(): void {
  }
  addItem(): void {

  setTimeout(() => {
;

 this.addbutton2 = true;
  this.addbutton3 = true;
  this.addbutton4 = true;
  this.addbutton5 = true;
  this.addbutton6 = true; // Set addbutton to true after a delay
    // Adjust the delay time as needed (in milliseconds)

  this.addbutton = !this.addbutton;
  // Close Step 1

  this.addbutton2= false;
  this.addbutton3 = false;
  this.addbutton4 = false;
  this.addbutton5 = false;
  this.addbutton6 = false;
}, 500);
 }

  addItem1(): void {

      setTimeout(() => {
   this.addbutton = true;
        this.addbutton3 = true;
    this.addbutton4 = true;
    this.addbutton5 = true;
    this.addbutton6 = true; // Set addbutton to true after a delay
      // Adjust the delay time as needed (in milliseconds)

    this.addbutton2 = !this.addbutton2;
    // Close Step 1
    this.addbutton = false;
    this.addbutton3 = false;
    this.addbutton4 = false;
    this.addbutton5 = false;
    this.addbutton6 = false;
  }, 500);
}
  addItem2(): void {
    this.addbutton3 = !this.addbutton3;
    // Close Step 1
    this.addbutton = false;
    this.addbutton2 = false;
    this.addbutton4 = false;
    this.addbutton5 = false;
    this.addbutton6 = false;
  }
  addItem3(): void {
    this.addbutton4 = !this.addbutton4;
    // Close Step 1
    this.addbutton = false;
    this.addbutton2 = false;
    this.addbutton3 = false;
    this.addbutton5 = false;
    this.addbutton6 = false;
  }
  addItem4(): void {
    this.addbutton5 = !this.addbutton5;
    // Close Step 1
    this.addbutton = false;
    this.addbutton2 = false;
    this.addbutton3 = false;
    this.addbutton4 = false;
    this.addbutton6 = false;
  }
  addItem5(): void {
    this.addbutton6 = !this.addbutton6;
    // Close Step 1
    this.addbutton = false;
    this.addbutton2 = false;
    this.addbutton3 = false;
    this.addbutton4 = false;
    this.addbutton5 = false;
  }
  handleSearch(searchValue: string) {
    switch (searchValue.toLowerCase()) {
      case 'startup furnace':

         this.router.navigate(['/main/Admin']);
             break;
      // Add more cases for other search values
      default:
        console.log('Search value:', searchValue); // Log the search value if no specific action is defined
    }
  }

handleClick() {
  this.isClicked = true;
}
toggleClicked(): void {
  this.isClicked = !this.isClicked;
}
}

