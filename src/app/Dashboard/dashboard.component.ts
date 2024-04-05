import { Component, OnInit } from '@angular/core';

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
  constructor() {
    // Initialize properties if needed
    this.regob = ''; // Example initialization
    this.unique_district_count = 0; // Example initialization
    this.barchat = ''; // Example initialization
  }
  ngOnInit(): void {
  }
  addItem(): void {
    this.addbutton = !this.addbutton;
    // Close Step 2
    this.addbutton2 = false;
    this.addbutton3 = false;
    this.addbutton4 = false;
    this.addbutton5 = false;
    this.addbutton6 = false;
  }
  addItem1(): void {
    this.addbutton2 = !this.addbutton2;
    // Close Step 1
    this.addbutton = false;
    this.addbutton3 = false;
    this.addbutton4 = false;
    this.addbutton5 = false;
    this.addbutton6 = false;
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
}
