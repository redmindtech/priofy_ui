import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-swpcloseout',
  templateUrl: './swpcloseout.component.html',
  styleUrls: ['./swpcloseout.component.css']
})
export class SwpcloseoutComponent implements OnInit {
  swpcloseout: FormGroup;
  signatureImage: string;
  signatureImage1:string;
  userDetails: any;
  userObject: any;
  position: any;
  Job_rep_disable:any;
  SWP_Issuer_disable:any;


  constructor( private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.userDetails = localStorage.getItem('currentUser');
    this.userObject = JSON.parse(this.userDetails);
    this.position = this.userObject.position;
    console.log(this.position)
    // SWP_Issuer
    if (this.position === 'Job_rep') {
      this.Job_rep_disable = false;
      this.SWP_Issuer_disable = true;
     
    } else if (this.position === 'SWP_Issuer') {
      this.Job_rep_disable = true;
      this.SWP_Issuer_disable = false;
      
     
    }
    else{
      this.Job_rep_disable = true;
      this.SWP_Issuer_disable = true;
    }
    this.formInitialization()
    this.signatureImage1 = "../../../assets/img/sign.png";
  }
  formInitialization() {
    const currentDate = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
  const currentTime = new Date().toTimeString().split(' ')[0]; 
  console.log('Current Date:', currentDate);
  console.log('Current Time:', currentTime);
  this.swpcloseout = this.formBuilder.group({
      Housekeeping:[null],
      jobandequipment:[null],
      Radioactive:[null],
      Area_Equipment:[null],
      closeoutstatus:['Pending'],
      close_out_status_date:[currentDate],
      close_out_status_time:[[currentTime]],
      additionalchecklists:[null],
      additionalchecklists_date:[currentDate],
      additionalchecklists_time:[currentTime],
      Work_Completed:[null],
      Work_Completed_emp:[null],
      Work_Completed_date:[currentDate],
      Work_Completed_time:[currentTime],
      Additional_Work:[null],
      Additional_Work_Completed:[null],
      Additional_Work_Completed_emp:[null],
      Additional_Work_date:[currentDate],
      Additional_Work_time:[currentTime],
      HouseKeeping_Comp_emp:[null],
      HouseKeeping_Comp:[null],
      HouseKeeping_Comp_date:[currentDate],
      HouseKeeping_Comp_time:[currentTime],
      HouseKeepingCheck:[null],
      HouseKeeping:[null],
      HouseKeeping_emp:[null],
      HouseKeeping_date:[currentDate],
      HouseKeeping_time:[currentTime],
      EquipmentTested:[null],
      Detagged:[null],
      ReadyforService:[null],
      EquipmentTested_emp:[null],
      EquipmentTested_date:[currentDate],
      EquipmentTested_time:[currentTime],

 
    });


 
  }
  showSignature() {
  console.log("cdsfdgrg")
    this.signatureImage = this.signatureImage1; // Replace this with your actual signature image URL
  }
}
