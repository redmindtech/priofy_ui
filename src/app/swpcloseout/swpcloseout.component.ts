import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormControl, Validators } from '@angular/forms';
import { SwpcloseoutService } from '@app/utils/swpcloseout.service';
//import { ProcessingswpService } from '@app/utils/service/processingswp.service';
import Swal from 'sweetalert2';
import { SwprequestService } from '@app/utils/swprequest.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-swpcloseout',
  templateUrl: './swpcloseout.component.html',
  styleUrls: ['./swpcloseout.component.css']
})
export class SwpcloseoutComponent implements OnInit {
  swpcloseout1!: FormGroup;
  swpcloseout2!: FormGroup;
  swpcloseout3!: FormGroup;
  swpcloseout4!: FormGroup;
  signatureImage: string;
  signatureImage1:string;
  userDetails: any;
  userObject: any;
  paramsId:any;
  position: any;
  Job_rep_disable:any;
  SWP_Issuer_disable:any;
  accordionClosed: boolean = false;
  Safeworkpermitup: boolean;
   safeid: any;
  ecp: any;
  wc_sign:any;
  house_keeping: any;
  job_and_equipment: any;
  radio_active: any;
  area_Equipment: any;
  trso_sign: any;
  close_out_status: any;
  work_Completed_emp: any;
  Safeworkpermitup1: boolean;
  Safeworkpermitup2: boolean;
  Safeworkpermitup3: boolean;
  Safeworkpermitup4: boolean;
  emp_number: any;
  isUpdateButtonDisabled = true;
  constructor( private formBuilder: FormBuilder,private apiService: SwpcloseoutService,private apiswpService:SwprequestService,private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.paramsId = this.activatedRoute.snapshot.queryParams?.['id'];
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
    trso_sign:['sudha'],
    wc_sign:['ragam'],
    close_out_status:['Pending',Validators.required],
    close_out_status_date:[currentDate,Validators.required],
    close_out_status_time:[currentTime,Validators.required],
    safeworkpermitRequest_id:[this.safeid],
    userid:[this.userObject.id],
    id:[null],
  });
  this.swpcloseout2 = this.formBuilder.group({
    additional_checklists:[null,Validators.required],
    additional_checklists_date:[currentDate,Validators.required],
    additional_checklists_time:[currentTime,Validators.required],
      add_sign:[null],
      safeworkpermitRequest_id:[this.safeid],
      userid:[this.userObject.id],
      id:[null],
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
      safeworkpermitRequest_id:[this.safeid],
      userid:[this.userObject.id],
      id:[null],
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
      safeworkpermitRequest_id:[this.safeid],
      userid:[this.userObject.id],
      id:[null],
    });

    if (this.paramsId) {
      this.onEditClick();
    }

  }
  showSignature() {
  console.log("cdsfdgrg")
    this.signatureImage = this.signatureImage1; // Replace this with your actual signature image URL
  }

  swpcloseoutsave1(){
    this.accordionClosed=false;
    this.swpcloseout1.get('safeworkpermitRequest_id')?.setValue(this.safeid)
    const swpcloseout1 = this.swpcloseout1.value;
    console.log('Form Data:', swpcloseout1);
    this.apiService.saveswpcloseout1(swpcloseout1).subscribe(
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
    this.swpcloseout2.get('safeworkpermitRequest_id')?.setValue(this.safeid)
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
    this.swpcloseout3.get('safeworkpermitRequest_id')?.setValue(this.safeid)
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
    this.swpcloseout4.get('safeworkpermitRequest_id')?.setValue(this.safeid)
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
  swpcloseupdate1(): void {
    const formData = this.swpcloseout1.value;
    console.log('formData: ', formData);
    this.apiService.updateswpcloseout1(formData).subscribe(
      (response) => {
        this.showAlert('success', 'Safe Work Permit preparations Updated successfully!');
        this.swpcloseout1.reset();
        this.accordionClosed=false;
      },
      (error: any) => {
        console.error('An error occurred:', error);
        this.showAlert('error', 'Failed to Updated Safe Work Permit preparations');
        // Handle error appropriately, e.g., show error message to user
      }
    )
}
swpcloseupdate2(): void {
  const formData = this.swpcloseout2.value;
  console.log('formData: ', formData);
  this.apiService.updateswpcloseout2(formData).subscribe(
    (response) => {
      this.showAlert('success', 'Safe Work Permit preparations Updated successfully!');
      this.swpcloseout2.reset();
      this.accordionClosed=false;
    },
    (error: any) => {
      console.error('An error occurred:', error);
      this.showAlert('error', 'Failed to Updated Safe Work Permit preparations');
      // Handle error appropriately, e.g., show error message to user
    }
  )
}
swpcloseupdate3(): void {
  const formData = this.swpcloseout3.value;
  console.log('formData: ', formData);
  this.apiService.updateswpcloseout3(formData).subscribe(
    (response) => {
      this.showAlert('success', 'Safe Work Permit preparations Updated successfully!');
      this.swpcloseout3.reset();
      this.accordionClosed=false;
    },
    (error: any) => {
      console.error('An error occurred:', error);
      this.showAlert('error', 'Failed to Updated Safe Work Permit preparations');
      // Handle error appropriately, e.g., show error message to user
    }
  )
}
swpcloseupdate4(): void {
  const formData = this.swpcloseout4.value;
  console.log('formData: ', formData);
  this.apiService.updateswpcloseout4(formData).subscribe(
    (response) => {
      this.showAlert('success', 'Safe Work Permit preparations Updated successfully!');
      this.swpcloseout4.reset();
      this.accordionClosed=false;
    },
    (error: any) => {
      console.error('An error occurred:', error);
      this.showAlert('error', 'Failed to Updated Safe Work Permit preparations');
      // Handle error appropriately, e.g., show error message to user
    }
  )
}
onEditClick(): void {
  // Fetch permit data by ID
  this.apiswpService.getswprequestById(this.paramsId).subscribe(
    (data: any) => {
      console.log(data.result);

      console.log(data);
      this.safeid=data.result[0].id,
      console.log('this.safeid: ', this.safeid);
      this.emp_number=data.result[0]?.userLoginDTO?.employee_id;

      this.swpcloseout3.get('work_Completed_emp')?.setValue(this.emp_number || null);
      this.swpcloseout3.get('additional_Work_Completed_emp')?.setValue(this.emp_number || null);
      this.swpcloseout3.get('houseKeeping_Comp_emp')?.setValue(this.emp_number || null);

    this.swpcloseout4.get('houseKeeping_emp')?.setValue(this.emp_number|| null);
    this.swpcloseout4.get('equipmentTested_emp')?.setValue(this.emp_number|| null);

      this.Safeworkpermitup1= data.result[0]?.closeout1?.safeworkpermitRequest_id ? true : false;
      this.Safeworkpermitup2= data.result[0]?.closeout2?.safeworkpermitRequest_id ? true : false;
      this.Safeworkpermitup3= data.result[0]?.closeout3?.safeworkpermitRequest_id ? true : false;
      this.Safeworkpermitup4= data.result[0]?.closeout4?.safeworkpermitRequest_id ? true : false;
      console.log('Safeworkpermitup1:', this.Safeworkpermitup1);
      console.log('swpcloseout1 validity:', this.swpcloseout1.valid);

      this.swpcloseout1.patchValue(data.result[0].closeout1);
      this.swpcloseout2.patchValue(data.result[0].closeout2);
      this.swpcloseout3.patchValue(data.result[0].closeout3);
      this.swpcloseout4.patchValue(data.result[0].closeout4);
    },
    (error: any) => {
      console.error('Error fetching data:', error);
    }
  );}

  showAlert(icon: 'success' | 'error', text: string): void {
    Swal.fire({
      title: 'Permit Creation',
      text: text,
      icon: icon,
      confirmButtonText: 'OK',
    });
  }
}


