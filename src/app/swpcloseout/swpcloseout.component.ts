import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormControl, Validators } from '@angular/forms';
import { SwpcloseoutService } from '@app/utils/swpcloseout.service';

@Component({
  selector: 'app-swpcloseout',
  templateUrl: './swpcloseout.component.html',
  styleUrls: ['./swpcloseout.component.css']
})
export class SwpcloseoutComponent implements OnInit {
  swpcloseout1: FormGroup;
  swpcloseout2: FormGroup;
  swpcloseout3: FormGroup;
  swpcloseout4: FormGroup;
  signatureImage: string;
  signatureImage1:string;
  userDetails: any;
  userObject: any;
  position: any;
  Job_rep_disable:any;
  SWP_Issuer_disable:any;
  accordionClosed: boolean = false;


  constructor( private formBuilder: FormBuilder,private apiService: SwpcloseoutService,) { }

  ngOnInit(): void {
    this.userDetails = localStorage.getItem('currentUser');
    this.userObject = JSON.parse(this.userDetails);
    this.position = this.userObject.position;
    console.log(this.position)
    // SWP_Issuer
    
    this.formInitialization()
    this.signatureImage1 = "../../../assets/img/sign.png";
  }
  formInitialization() {
    const currentDate = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
  const currentTime = new Date().toTimeString().split(' ')[0]; 
  console.log('Current Date:', currentDate);
  console.log('Current Time:', currentTime);
  this.swpcloseout1 = this.formBuilder.group({
    house_keeping:[null,Validators.required],
    job_and_equipment:[null,Validators.required],
    radio_active:[null,Validators.required],
    area_Equipment:[null,Validators.required],
    trso_sign:[null],
    close_out_status:['Pending',Validators.required],
    close_out_status_date:[currentDate,Validators.required],
    close_out_status_time:[currentTime,Validators.required],
    safeworkpermitRequest_id:[1],
    userid:[this.userObject.id],

  });
  this.swpcloseout2 = this.formBuilder.group({
    additional_checklists:[null,Validators.required],
    additional_checklists_date:[currentDate,Validators.required],
    additional_checklists_time:[currentTime,Validators.required],
      add_sign:[null],
      safeworkpermitRequest_id:[1],
      userid:[this.userObject.id],
  });
  this.swpcloseout3 = this.formBuilder.group({
    add_sign:[null],
    work_Completed:[null,Validators.required],
    work_Completed_emp:[null,Validators.required],
      work_Completed_date:[currentDate,Validators.required],
      work_Completed_time:[currentTime,Validators.required],
      work_Completed_sign:[null],

      additional_Work:[null,Validators.required],
      additional_Work_Completed:[null,Validators.required],
      additional_Work_Completed_emp:[null,Validators.required],
      additional_Work_date:[currentDate,Validators.required],
      additional_Work_time:[currentTime,Validators.required],
      houseKeeping_Comp:[null,Validators.required],
      houseKeeping_Comp_emp:[null,Validators.required],
      houseKeeping_Comp_date:[currentDate,Validators.required],
      houseKeeping_Comp_time:[currentTime,Validators.required],
      safeworkpermitRequest_id:[1],
      userid:[this.userObject.id],
  });
  this.swpcloseout4 = this.formBuilder.group({
    house_Keeping_Check:[null,Validators.required],
    houseKeeping_sign:[null,Validators.required],
      houseKeeping_emp:[null,Validators.required],
      houseKeeping_date:[currentDate,Validators.required],
      houseKeeping_time:[currentTime,Validators.required],
      equipmentTested:[null,Validators.required],
      detagged:[null,Validators.required],
      ready_for_Service:[null,Validators.required],
      equipmentTested_emp:[null,Validators.required],
      equipmentTested_date:[currentDate,Validators.required],
      equipmentTested_time:[currentTime,Validators.required],
      safeworkpermitRequest_id:[1],
      userid:[this.userObject.id],
    });


 
  }
  showSignature() {
  console.log("cdsfdgrg")
    this.signatureImage = this.signatureImage1; // Replace this with your actual signature image URL
  }
  
  swpcloseoutsave1(){
    this.accordionClosed=false;
    const firstFormValue = this.swpcloseout1.value;
    console.log('Form Data:', firstFormValue);
    this.apiService.saveswpcloseout1(firstFormValue).subscribe(
      (response) => {
        console.log('Response from server:', response);
        
        // this.router.navigate(['/main/toolcomp']);
        
     
      },
      (error) => {
        console.error('Error while sending data:', error);
        
      }
    );
  }

  swpcloseoutsave2(){
    this.accordionClosed=false;
    const firstFormValue = this.swpcloseout2.value;
    console.log('Form Data:', firstFormValue);
    this.apiService.saveswpcloseout2(firstFormValue).subscribe(
      (response) => {
        console.log('Response from server:', response);
        
        // this.router.navigate(['/main/toolcomp']);
        
     
      },
      (error) => {
        console.error('Error while sending data:', error);
        
      }
    );
  }
  swpcloseoutsave3(){
    this.accordionClosed=false;
    const firstFormValue = this.swpcloseout3.value;
    console.log('Form Data:', firstFormValue);
    this.apiService.saveswpcloseout3(firstFormValue).subscribe(
      (response) => {
        console.log('Response from server:', response);
        
        // this.router.navigate(['/main/toolcomp']);
        
     
      },
      (error) => {
        console.error('Error while sending data:', error);
        
      }
    );
  }

  swpcloseoutsave4(){
    this.accordionClosed=false;
    const firstFormValue = this.swpcloseout4.value;
    console.log('Form Data:', firstFormValue);
    this.apiService.saveswpcloseout4(firstFormValue).subscribe(
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
