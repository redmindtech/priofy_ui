import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SwapapprovalService } from '@app/utils/swapapproval.service';
import { SwprequestService } from '@app/utils/swprequest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-swapapproval',
  templateUrl: './swapapproval.component.html',
  styleUrls: ['./swapapproval.component.css']
})
export class SwapapprovalComponent implements OnInit {
  formattedDate: string;
  formattedTime: string;
  agreementForm1: FormGroup;
  agreementForm2: FormGroup;
  allChecked: boolean = false;
  currentUser: any;
  position: any;
  accordionClosed: boolean = false;
  paramsId: any;
  safeid: any;
  agreementForm1up: boolean;
  agreementForm2up: boolean;
  employeenumber: any;
  

  


  constructor(private formBuilder: FormBuilder,private apiService:SwapapprovalService,private apiswpService: SwprequestService,private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.paramsId = this.activatedRoute.snapshot.queryParams?.['id'];

    const storedUser = localStorage.getItem('currentUser');
    this.currentUser = storedUser ? JSON.parse(storedUser) : null;
    this.position=this.currentUser.position;
    const currentDate = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
  const currentTime = new Date().toTimeString().split(' ')[0]; 
  if (this.paramsId) {
    this.onEditClick();
  }
    this.agreementForm1 = this.formBuilder.group({
      scopeOfWork: [false,Validators.required],
      hazards: [false,Validators.required],
      ppeRequirements: [false,Validators.required],
      necessarySkills: [false,Validators.required],
      emergencyKnowledge: [false,Validators.required],
      impactOfWork: [false,Validators.required],
      sign:[null],
      date:[currentDate,Validators.required],
      time:[currentTime,Validators.required],
      safeworkpermitRequest_id:[this.safeid],
    userid:[this.currentUser.id],
    id:[null]
    });
    this.agreementForm2 = this.formBuilder.group({
      people_training: [null,Validators.required],
      location_known: [null,Validators.required],
      equipment_prepared: [null,Validators.required],
      boundaries_reviewed: [null,Validators.required],
      sign:[null],
      date:[currentDate,Validators.required],
      time:[currentTime,Validators.required],
      safeworkpermitRequest_id:[this.safeid],
    userid:[this.currentUser.id],
    id:[null]

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
  const formValues = this.agreementForm1.value;
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
      if (!this.agreementForm1.valid) {

        console.log("Field not valid:", key);
        return false;
      }
    }
  }
  
  console.log("All fields valid.");
  return true;
}




agreementFormsave1(){


  this.agreementForm1.get('safeworkpermitRequest_id')?.setValue(this.safeid)
   
  const firstFormValue = this.agreementForm1.value;
  console.log('Form Data:', firstFormValue);
  this.apiService.saveswapapproval1(firstFormValue).subscribe(
    (response) => {
      this.showAlert('success', 'Safe Work Permit preparations Updated successfully!');
      this.agreementForm1.reset();
      this.accordionClosed=false;
      console.log('Response from server:', response);
      
      // this.router.navigate(['/main/toolcomp']);
      
   
    },
    (error) => {
      console.error('Error while sending data:', error);
      this.showAlert('error', 'Failed to Create Safe Work Permit preparations ');
      
    }
  );
};
agreementFormsave2(){
  this.accordionClosed=false;
  this.agreementForm2.get('safeworkpermitRequest_id')?.setValue(this.safeid)

  const firstFormValue = this.agreementForm1.value;
  console.log('Form Data:', firstFormValue);
  this.apiService.saveswapapproval2(firstFormValue).subscribe(
    (response) => {
      console.log('Response from server:', response);
      this.showAlert('success', 'Safe Work Permit preparations Created successfully!');
        this.agreementForm2.reset();
        this.accordionClosed = false;
      
      // this.router.navigate(['/main/toolcomp']);
      
   
    },
    (error) => {
      console.error('Error while sending data:', error);
      
    }
  );
}
onEditClick(): void {
  // Fetch permit data by ID
  this.apiswpService.getswprequestById(this.paramsId).subscribe(
    (data: any) => {
      console.log(data);
      this.safeid=data.result[0].id
      console.log('this.safeid: ', this.safeid);
      
     

      
      this.agreementForm1up= data.result[0]?.approval1?.safeworkpermitRequest_id ? true : false;
      this.agreementForm2up= data.result[0]?.approval2?.safeworkpermitRequest_id ? true : false;
      // Patch form values with API response
      this.agreementForm1.patchValue(data.result[0].approval1);
      this.agreementForm2.patchValue(data.result[0].approval2); // Assuming data structure matches form controls

      this.employeenumber=data.result[0]?.userLoginDTO?.employee_id;
      console.log(this.employeenumber);
    
    },
    (error: any) => {
      console.error('Error fetching data:', error);
    }
  );
}

showAlert(icon: 'success' | 'error', text: string): void {
  Swal.fire({
    title: 'Permit Creation',
    text: text,
    icon: icon,
    confirmButtonText: 'OK',
  });
}


saveFormup1(): void {
  const formData = this.agreementForm1.value;
  console.log('formData: ', formData);
  this.apiService.updateswpapproval1(formData).subscribe(
    (response) => {
      this.showAlert('success', 'Safe Work Permit preparations Updated successfully!');
      this.agreementForm1.reset();
      this.accordionClosed=false;
    },
    (error) => {
      console.error('An error occurred:', error);
      this.showAlert('error', 'Failed to Updated Safe Work Permit preparations');
      // Handle error appropriately, e.g., show error message to user
    }
  )
}


saveFormup2(): void {
  const formData2 = this.agreementForm2.value;
  console.log('formData2: ', formData2);
  this.apiService.updateswpapproval2(formData2).subscribe(
    (response) => {
      this.showAlert('success', 'Safe Work Permit preparations Updated successfully!');
      this.agreementForm2.reset();
      this.accordionClosed=false;
    },
    (error) => {
      console.error('An error occurred:', error);
      this.showAlert('error', 'Failed to Updated Safe Work Permit preparations');
      // Handle error appropriately, e.g., show error message to user
    }
  )
}
}