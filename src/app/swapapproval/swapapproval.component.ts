import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-swapapproval',
  templateUrl: './swapapproval.component.html',
  styleUrls: ['./swapapproval.component.css']
})
export class SwapapprovalComponent implements OnInit {
  formattedDate: string;
  formattedTime: string;
  agreementForm: FormGroup;
  allChecked: boolean = false;
  currentUser: any;
  position: any;
  // accordionClosed: boolean = false;
  


  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
    const seconds = currentDate.getSeconds().toString().padStart(2, '0');
  
    this.formattedDate = `${year}-${month}-${day}`;
    this.formattedTime = `${hours}:${minutes}:${seconds}`;
  

    this.agreementForm = this.formBuilder.group({
      scopeOfWork: false,
      hazards: false,
      ppeRequirements: false,
      necessarySkills: false,
      emergencyKnowledge: false,
      impactOfWork: false
    });

    this.agreementForm.valueChanges.subscribe(() => {
      this.allChecked = this.allCheckboxesChecked();
      console.log('All checkboxes checked:', this.allChecked);
    });
    const storedUser = localStorage.getItem('currentUser');
    this.currentUser = storedUser ? JSON.parse(storedUser) : null;
    this.position=this.currentUser.position;
  }

  allCheckboxesChecked(): boolean {
    const formValues = this.agreementForm.value;
    return Object.values(formValues).every(value => value === true);
  }
//   save(){
// this.accordionClosed=false;
//   }
}