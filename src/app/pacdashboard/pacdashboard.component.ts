import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pacdashboard',
  templateUrl: './pacdashboard.component.html',
  styleUrls: ['./pacdashboard.component.css']
})
export class PacdashboardComponent implements OnInit {

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
//   addItem(): void {

//   setTimeout(() => {
// ;

//  this.addbutton2 = true;
//   this.addbutton3 = true;
//   this.addbutton4 = true;
//   this.addbutton5 = true;
//   this.addbutton6 = true; // Set addbutton to true after a delay
//     // Adjust the delay time as needed (in milliseconds)

//   this.addbutton = !this.addbutton;
//   // Close Step 1

//   this.addbutton2= false;
//   this.addbutton3 = false;
//   this.addbutton4 = false;
//   this.addbutton5 = false;
//   this.addbutton6 = false;
// }, 500);
//  }

addItem(){
  
  this.router.navigate(['/main/swptable'] );
  
}
  addItem1(){
    this.router.navigate(['/main/dashboard'] );
  }
 

handleClick() {
  this.isClicked = true;
}
toggleClicked(): void {
  this.isClicked = !this.isClicked;
}


}
