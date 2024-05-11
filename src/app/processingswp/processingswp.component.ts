import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProcessingswpService } from '@app/utils/service/processingswp.service';
import { SwprequestService } from '@app/utils/swprequest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-processingswp',
  templateUrl: './processingswp.component.html',
  styleUrls: ['./processingswp.component.css']
})
export class ProcessingswpComponent implements OnInit {
  Safeworkpermit!: FormGroup;
  Safeworkpermit1!: FormGroup;
  Safeworkpermit2!: FormGroup;
  Safeworkpermit21!:FormGroup
  Safeworkpermit3!: FormGroup;
  Safeworkpermit4!: FormGroup;
  Safeworkpermit5!: FormGroup;
  Safeworkpermit6!: FormGroup;
  Safeworkpermit7!: FormGroup;
  Safeworkpermit9!: FormGroup;
  Safeworkpermit8!: FormGroup;

  isDisabled: boolean = true;
  

  items: string[] = [''];
  toppingList: string[] = ['CV-Closed Valve', 'OV-Open Valve', 'SB-Slip Blind', 'SR-Spool Removed', 'OP-One Plus', 'TL-Tag Lock','ED-Electrical Disconnect',
    'GD-Grounding Device','DL-Disconnect Line','BF-Blind Flange','AT-Adhesive Tape','RB-Remove Breaker & Lock','OF-Open Flange','BD-Blocking Device Installed',
    'ID-Instrument Disconnect','DV-Double Valve & Vent','RO-Rack-out Breaker & Lock','OL-Off Tag Lock'];
  formattedDate: string;
  formattedTime: string;
  showSignature: boolean = false;
  redtagaccount: any;
  addcount:number=0;
  currentUser: any;
  position: any;
  yesterdaytime: string;
  yesterdaydate: string;
  accordionClosed: boolean = false;
  paramsId: any;
  safeid: any;
  Safeworkpermitup: boolean;
  Safeworkpermit1up: boolean;
  ecp: any;
  equimentid: any;
  equimentid1: any;
  equimentid2: any;
  equimentid0: any;
  equimentid3: any;
  
  constructor(
    private formBuilder: FormBuilder,private apiService:ProcessingswpService,private activatedRoute: ActivatedRoute,private apiswpService: SwprequestService
  ) { }

  ngOnInit(): void {
    this.paramsId = this.activatedRoute.snapshot.queryParams?.['id'];
    const storedUser = localStorage.getItem('currentUser');
     this.currentUser = storedUser ? JSON.parse(storedUser) : null;
     this.position=this.currentUser.position;
    const currentDate = new Date();

// Format the date as needed (e.g., DD/MM/YYYY)
this.formattedDate = new Date().toISOString().split('T')[0]; 
this.yesterdaydate="2024-04-19"
this.yesterdaytime="16:42:33"
console.log('this.formattedDate: ', this.formattedDate);


// Format the time as needed (e.g., HH:MM:SS)
this.formattedTime = new Date().toTimeString().split(' ')[0];
console.log('this.formattedTime: ', this.formattedTime);


// Combine date and time



    this.formInitialization();
    if (this.paramsId) {
      this.onEditClick();
    }
    
  }
  saveForm(){
    console.log(this.Safeworkpermit)   
    this.Safeworkpermit.get('safeworkpermitRequest_id')?.setValue(this.safeid)
    const Safeworkpermit = this.Safeworkpermit.value;
    console.log('Form Data:', Safeworkpermit);
    this.apiService.savepreparation(Safeworkpermit).subscribe(
      (response) => {
        console.log('Response from serverrrrr:', response);
        
        this.showAlert('success', 'Safe Work Permit preparations Created successfully!');
        this.Safeworkpermit.reset();
        this.accordionClosed = false;
        
     
      },
      (error) => {
        console.error('Error while sending data:', error);
        this.showAlert('error', 'Failed to Create Safe Work Permit preparations ');
      }
    );
  }
  saveForm1(){
    console.log(this.Safeworkpermit1)  
    this.Safeworkpermit1.get('safeworkpermitRequest_id')?.setValue(this.safeid) 
    const Safeworkpermit1 = this.Safeworkpermit1.value;
    console.log('Form Data:', Safeworkpermit1);
    this.apiService.savepreparation1(Safeworkpermit1).subscribe(
      (response) => {
        console.log('Response from serverrrrr:', response);
        
        this.showAlert('success', 'Safe Work Permit preparations Created successfully!');
        this.Safeworkpermit.reset();
        this.accordionClosed = false;
        
     
      },
      (error) => {
        console.error('Error while sending data:', error);
        this.showAlert('error', 'Failed to Create Safe Work Permit preparations ');
      }
    );
  }
  saveForm2(){
    console.log(this.Safeworkpermit1)   
    const Safeworkpermit2 = this.Safeworkpermit2.value;
    console.log('Form Data:', Safeworkpermit2);
    this.apiService.savepreparation2(Safeworkpermit2).subscribe(
      (response) => {
        console.log('Response from serverrrrr:', response);
        
        // this.router.navigate(['/main/toolcomp']);
        
     
      },
      (error) => {
        console.error('Error while sending data:', error);
        
      }
    );
  }
  saveForm21(){
    console.log(this.Safeworkpermit1)   
    const Safeworkpermit21 = this.Safeworkpermit21.value;
    console.log('Form Data:', Safeworkpermit21);
    this.apiService.savepreparation21(Safeworkpermit21).subscribe(
      (response) => {
        console.log('Response from serverrrrr:', response);
        
        // this.router.navigate(['/main/toolcomp']);
        
     
      },
      (error) => {
        console.error('Error while sending data:', error);
        
      }
    );
  }
  saveForm3(){
    console.log(this.Safeworkpermit3)   
    const Safeworkpermit3 = this.Safeworkpermit3.value;
    console.log('Form Data:', Safeworkpermit3);
    this.apiService.savepreparation3(Safeworkpermit3).subscribe(
      (response) => {
        console.log('Response from serverrrrr:', response);
        
        // this.router.navigate(['/main/toolcomp']);
        
     
      },
      (error) => {
        console.error('Error while sending data:', error);
        
      }
    );
  }
  saveForm4(){
    console.log(this.Safeworkpermit4)   
    const Safeworkpermit4 = this.Safeworkpermit4.value;
    console.log('Form Data:', Safeworkpermit4);
    this.apiService.savepreparation4(Safeworkpermit4).subscribe(
      (response) => {
        console.log('Response from serverrrrr:', response);
        
        // this.router.navigate(['/main/toolcomp']);
        
     
      },
      (error) => {
        console.error('Error while sending data:', error);
        
      }
    );
  }
  saveForm7(){
    console.log(this.Safeworkpermit7)   
    const Safeworkpermit7 = this.Safeworkpermit7.value;
    console.log('Form Data:', Safeworkpermit7);
    this.apiService.savepreparation7(Safeworkpermit7).subscribe(
      (response) => {
        console.log('Response from serverrrrr:', response);
        
        // this.router.navigate(['/main/toolcomp']);
        
     
      },
      (error) => {
        console.error('Error while sending data:', error);
        
      }
    );
  }

  saveForm9(){
    console.log(this.Safeworkpermit9)   
    const Safeworkpermit9 = this.Safeworkpermit9.value;
    console.log('Form Data:', Safeworkpermit9);
    this.apiService.savepreparation9(Safeworkpermit9).subscribe(
      (response) => {
        console.log('Response from serverrrrr:', response);
        
        // this.router.navigate(['/main/toolcomp']);
        
     
      },
      (error) => {
        console.error('Error while sending data:', error);
        
      }
    );
  }

  saveForm8(){
    console.log(this.Safeworkpermit8)   
    const Safeworkpermit8 = this.Safeworkpermit8.value;
    console.log('Form Data:', Safeworkpermit8);
    this.apiService.savepreparation8(Safeworkpermit8).subscribe(
      (response) => {
        console.log('Response from serverrrrr:', response);
        
        // this.router.navigate(['/main/toolcomp']);
        
     
      },
      (error) => {
        console.error('Error while sending data:', error);
        
      }
    );
  }

  formInitialization(){
    this.Safeworkpermit = this.formBuilder.group({
     
      preparations_and_test:[''],
      house_keeping_instructions:[''],
      environmental_concerns:[''],
      physical_Hazards:[''],
      chemicals_last_contained:[''],
      inspection_required:[''],
      checklists_Attachments_Required:[''],
      conditions_set_by:[this.position],
      userid:[this.currentUser.id],
      safeworkpermitRequest_id:[this.safeid],
      id:[null]
    });
    this.Safeworkpermit1=
    this.formBuilder.group({
      mastercard_date: [this.formattedDate],
        mastercard_no:[null],
        mastercard_time: [this.formattedTime],
       reason_for_work: [''],
        red_tag: [''],
        safeworkpermitRequest_id:[this.safeid],
        userid: [this.currentUser.id],
        work_description:[''],
        id:[null]
        
    });
    this.Safeworkpermit2=
    this.formBuilder.group({
      add_tag:['0'],
      facility_representative_sign_comment:[null],
      facility_representative_sign:[null],
      safeworkpermitRequest_id: [this.safeid],
        userid: [this.currentUser.id],
    });
    this.Safeworkpermit21=
    this.formBuilder.group({
      job_representative_sign:[null],
      job_representative_sign_comment:[null],
      signature_other_unit_facility_representative:[null],
      signature_other_unit_facility_representative_comment:[null],
      employee_number:[null],
      safeworkpermitRequest_id: [1],
        userid: [this.currentUser.id],
    });
    this.Safeworkpermit3 = this.formBuilder.group({ 

      // mastercard_time:[this.formattedTime],
      ecp_number:[null],
      equp_id:[null],
      scope:[null],

      mastercard_no:[null],
      ecp_date:[this.yesterdaydate],
      ecp_time:[this.yesterdaytime],
      ecp_issued_date:[this.formattedDate],
      ecp_issued_time:[this.formattedTime],
      isolating_and_securing:[''],
      hazards_energies:[''],
      residual_energy_material:[''],
      used_to_verify:[''],
      inadvertent_operation:[''],
      special_instructions:[''],
      safeworkpermitRequest_id: [2],
        userid: [this.currentUser.id],
    });
    this.Safeworkpermit4=
    this.formBuilder.group({
      tag_added_location:[''],
      tag_added_location_sign:[''],
      tag_deletion_location:[''],
      tag_deletion_location_sign:[''],
      tags_reconcilation_date:[this.formattedDate],
      tags_reconcilation_time:[this.formattedTime],
      tags_reconcilation_sign:[null],
      safeworkpermitRequest_id: [1],
        userid: [this.currentUser.id],
    });

    this.Safeworkpermit8=
    this.formBuilder.group({
      facility_representative_name:[null],
      facility_representative_employee_number:[null],
      facility_representative_employee_number_sign:[null],
      facility_rep_date:[this.formattedDate],
      facility_rep_time:[this.formattedTime],
      safeworkpermitRequest_id: [1],
        userid: [this.currentUser.id],
    });

    this.Safeworkpermit9=
    this.formBuilder.group({
      job_facility_representative_name:[null],
      job_facility_representative_employee_number:[null],
      job_facility_representative_employee_number_sign:[null],
      job_rep_date:[this.formattedDate],

      job_rep_time:[this.formattedTime],
      safeworkpermitRequest_id: [1],
        userid: [this.currentUser.id],
    });
    this.Safeworkpermit7=
    this.formBuilder.group({
      contractor_rso:[''],
      equipment_prepared_date:[this.formattedDate],
      equipment_prepared_time:[this.formattedTime],
      equipment_prepared_employee_name:[''],
     equipment_prepared_employee_number:[''],
     fire_watch_name:[''],
     initial_date:[this.formattedDate],
       initial_time:[this.formattedTime],
    
       initial_others:[''],
       inside_barricade:[''],
       intial_lel:[''],
       intial_oxygen:[''],
       master_card_no:[null],
       outside_barricade:[''],
       radition_safe_condition:[''],
       retest_1_date:[this.formattedDate],
       retest_1_time:[this.formattedTime],
       retest_1_oxygen:[''],
      retest_1_lel:[''],
      retest_1_others:[''],
      retest_2_oxygen:[''],
        retest_2_lel:[''],
        retest_2_others:[''],
        retest_2_date:[this.formattedDate],
        retest_2_time:[this.formattedTime],
        reviewed_by_trso:[''],
        safety_attendant_name:[''],
        intial_test:[''],
      safeworkpermitRequest_id: [2],
        userid: [this.currentUser.id],
    });

this.Safeworkpermit5=
    this.formBuilder.group({
      toppings:[''],
        location_of_red_tags:[''],
        facilityrep_red_tag:[''],
        lock_number:[''],
       
        tags_reconciled_signature:[''],
        tag_added_location:[''],
        date_lock_date:[''],
        date_lock_time:[''],
        tag_deleted_location:[''],
        
    });
   
    

  }

  

  
  showSignatureCard() {
    this.showSignature = true;
    this.setupCanvas();
  }

  clearCanvas() {
    const canvas = document.getElementById('signature-canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    } else {
      console.error('Failed to get 2D context for canvas');
    }
  }

  saveSignature() {
    const canvas = document.getElementById('signature-canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const dataUrl = canvas.toDataURL();
      const signatureTextarea = document.getElementById('facility_representative_sign') as HTMLTextAreaElement;
      signatureTextarea.value = dataUrl; // You might want to save this data URL somewhere
      this.showSignature = false; // Hide signature card after saving
    } else {
      console.error('Failed to get 2D context for canvas');
    }
  }

  private setupCanvas() {
    const canvas = document.getElementById('signature-canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      let isDrawing = false;
      let lastX = 0;
      let lastY = 0;

      canvas.addEventListener('mousedown', (e) => {
        isDrawing = true;
        [lastX, lastY] = [e.offsetX, e.offsetY];
      });

      canvas.addEventListener('mousemove', (e) => {
        if (!isDrawing) return;
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
        [lastX, lastY] = [e.offsetX, e.offsetY];
      });

      canvas.addEventListener('mouseup', () => {
        isDrawing = false;
      });

      canvas.addEventListener('mouseout', () => {
        isDrawing = false;
      });
    } else {
      console.error('Failed to get 2D context for canvas');
    }
  }
  addRow() {
    // Push a new item to the items array
    this.items.push('');
    this.addcount = this.items.length - this.redtagaccount;
    console.log('this.addcount: ', this.addcount);
    this.Safeworkpermit.get('add_tag')?.setValue(this.addcount)
    

  }
  updateRedTagValue() {
    console.log("ll");
    // Your logic here to handle the updated value
    this.redtagaccount=this.Safeworkpermit.get('red_tag')?.value
    if(this.redtagaccount){
      console.log("jj");
      this.items = [''];
      for (let i = 0; i < this.redtagaccount-1; i++) {
        this.items.push('');
      }
    }
    // For example:
    // var redTagValue = value; // Saving the updated value to a global variable
}

expandclose(){
  this.accordionClosed=false;
}
onEditClick(): void {
  // Fetch permit data by ID
  this.apiswpService.getswprequestById(this.paramsId).subscribe(
    (data: any) => {
      console.log(data);
      this.safeid=data.result[0].id
      console.log('this.safeid: ', this.safeid);
      this.ecp=data.result[0]?.preparation1?.ecp;
      [this.equimentid0,this.equimentid1,this.equimentid2, this.equimentid3] = [data.result[0]?.equipmentID?.[0], data.result[0]?.equipmentID?.[1],data.result[0]?.equipmentID?.[2],data.result[0]?.equipmentID?.[3]];

      
      this.Safeworkpermitup= data.result[0]?.preparation1?.safeworkpermitRequest_id ? true : false;
      this.Safeworkpermit1up= data.result[0]?.preparation2?.safeworkpermitRequest_id ? true : false;
      // Patch form values with API response
      this.Safeworkpermit.patchValue(data.result[0].preparation1);
      this.Safeworkpermit1.patchValue(data.result[0].preparation2); // Assuming data structure matches form controls
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
  saveFormup(): void {
      const formData = this.Safeworkpermit.value;
      console.log('formData: ', formData);
      this.apiService.updateswprequest(formData).subscribe(
        (response) => {
          this.showAlert('success', 'Safe Work Permit preparations Updated successfully!');
          this.Safeworkpermit.reset();
          this.accordionClosed=false;
        },
        (error) => {
          console.error('An error occurred:', error);
          this.showAlert('error', 'Failed to Updated Safe Work Permit preparations');
          // Handle error appropriately, e.g., show error message to user
        }
      )
  }
  saveFormup1(): void {
    const formData = this.Safeworkpermit1.value;
    console.log('formData: ', formData);
    this.apiService.updateswprequest1(formData).subscribe(
      (response) => {
        this.showAlert('success', 'Safe Work Permit preparations Updated successfully!');
        this.Safeworkpermit.reset();
        this.accordionClosed=false;
      },
      (error) => {
        console.error('An error occurred:', error);
        this.showAlert('error', 'Failed to Updated Safe Work Permit preparations ');
        // Handle error appropriately, e.g., show error message to user
      }
    )
}

}
