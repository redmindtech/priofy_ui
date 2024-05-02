import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SwapapprovalService } from '@app/utils/swapapproval.service';

@Component({
  selector: 'app-swapapproval',
  templateUrl: './swapapproval.component.html',
  styleUrls: ['./swapapproval.component.css']
})
export class SwapapprovalComponent implements OnInit {
  formattedDate: string;
  formattedTime: string;
  agreementForm: FormGroup;
  agreementForm1: FormGroup;
  allChecked: boolean = false;
  currentUser: any;
  position: any;
  accordionClosed: boolean = false;

  


  constructor(private formBuilder: FormBuilder,private apiService:SwapapprovalService) { }

  ngOnInit(): void {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUser = storedUser ? JSON.parse(storedUser) : null;
    this.position=this.currentUser.position;
    const currentDate = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
  const currentTime = new Date().toTimeString().split(' ')[0]; 

    this.agreementForm = this.formBuilder.group({
      scopeOfWork: [false,Validators.required],
      hazards: [false,Validators.required],
      ppeRequirements: [false,Validators.required],
      necessarySkills: [false,Validators.required],
      emergencyKnowledge: [false,Validators.required],
      impactOfWork: [false,Validators.required],
      sign:[null],
      date:[currentDate,Validators.required],
      time:[currentTime,Validators.required],
      safeworkpermitRequest_id:[1],
    userid:[this.currentUser.id],
    });
    this.agreementForm1 = this.formBuilder.group({
      people_training: [null,Validators.required],
      location_known: [null,Validators.required],
      equipment_prepared: [null,Validators.required],
      boundaries_reviewed: [null,Validators.required],
      sign:[null],
      date:[currentDate,Validators.required],
      time:[currentTime,Validators.required],
      safeworkpermitRequest_id:[1],
    userid:[this.currentUser.id],
    });
    // this.agreementForm.valueChanges.subscribe(() => {
    //   this.allChecked = this.allCheckboxesChecked();
    //   console.log('All checkboxes checked:', this.allChecked);
    // });
    
  }
  
  // allCheckboxesChecked(): boolean {
  //   const formValues = this.agreementForm.value;
  //   return Object.values(formValues).every(value => value === true);
  // }
//   save(){
// this.accordionClosed=false;
//   }

isFormValid(): boolean {
  const formValues = this.agreementForm.value;
  const keysToExclude = ['scopeOfWork', 'hazards', 'ppeRequirements', 'necessarySkills', 'emergencyKnowledge', 'impactOfWork'];

  for (const key in formValues) {
    // Check if the current key is among the excluded keys
    if (keysToExclude.includes(key)) {
      // If the excluded control's value is not true, return false
      if (formValues[key] !== true) {
        console.log("Excluded field not true:", key);
        return false;
      }
    } else {
      // Check if the non-excluded control is valid
      if (!this.agreementForm.valid) {

        console.log("Field not valid:", key);
        return false;
      }
    }
  }
  
  console.log("All fields valid.");
  return true;
}




agreementFormsave1(){
  this.accordionClosed=false;
  if (this.agreementForm.valid) {
   
  const firstFormValue = this.agreementForm.value;
  console.log('Form Data:', firstFormValue);
  this.apiService.saveswapapproval1(firstFormValue).subscribe(
    (response) => {
      console.log('Response from server:', response);
      
      // this.router.navigate(['/main/toolcomp']);
      
   
    },
    (error) => {
      console.error('Error while sending data:', error);
      
    }
  );
}};
agreementFormsave2(){
  this.accordionClosed=false;
  const firstFormValue = this.agreementForm1.value;
  console.log('Form Data:', firstFormValue);
  this.apiService.saveswapapproval2(firstFormValue).subscribe(
    (response) => {
      console.log('Response from server:', response);
      
      // this.router.navigate(['/main/toolcomp']);
      
   
    },
    (error) => {
      console.error('Error while sending data:', error);
      
    }
  );
}
}