import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-processingswp',
  templateUrl: './processingswp.component.html',
  styleUrls: ['./processingswp.component.css']
})
export class ProcessingswpComponent implements OnInit {
  Safeworkpermit!: FormGroup;
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
  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
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
   
    
  }
  formInitialization(){
    this.Safeworkpermit = this.formBuilder.group({
     
      preparations_and_test:[''],
      house_keeping_instructions:[''],
      environmental_concerns:[''],
      Physical_Hazards:[''],
      chemicals_last_contained:[''],
      inspection_required:[''],
      checklists_Attachments_Required:[''],
      conditions_set_by:[''],
      mastercard_date:[this.formattedDate],
      mastercard_time:[this.formattedTime],
      red_tag:[''],
      reason_for_work:[''],
      work_description:[''],
      add_tag:[0],
      facility_representative_sign:[''],
      
      job_representative_sign:[''],
      
      signature_other_unit_facility_representative:[''],
      employee_number:[''],
      ecp_date:[this.yesterdaydate],
      ecp_time:[this.yesterdaytime],
      ecp_issued_date:[this.formattedDate],
      ecp_issued_time:[this.formattedTime],
      isolating_and_securing:[''],
      hazards_energies:[''],
      residual_energy_material:[''],
      inspection_required_job:[''],
      inadvertent_operation:[''],
      special_instructions:[''],

      toppings:[''],
      location_of_red_tags:[''],
      facilityrep_red_tag:[''],
      lock_number:[''],
      tags_reconcilation_date:[this.formattedDate],
      tags_reconcilation_time:[this.formattedTime],
      tags_reconciled_signature:[''],
      tag_added_location:[''],
     
      tag_deleted_location:[''],
      
     initial_lel:[''],
      initial_oxygen:[''],
      initial_others:[''],
      initial_date:[this.formattedDate],
      initial_time:[this.formattedTime],
      retest_1_oxygen:[''],
      retest_1_lel:[''],
      retest_1_others:[''],
      retest_1_date:[this.formattedDate],
      retest_1_time:[this.formattedTime],
      retest_2_oxygen:[''],
      retest_2_lel:[''],
      retest_2_others:[''],
      retest_2_date:[this.formattedDate],
      retest_2_time:[this.formattedTime],
      equipment_prepared_facility_rep:[''],
      equipment_prepared_employee_number:[''],
      equipment_prepared_date:[this.formattedDate],
      equipment_prepared_time:[this.formattedTime],
      
      fire_watch_name:[''],
      initial_dep_rep:[''],
      safety_attendant_name:[''],
      reviewed_by_trso:[''],
      contractor_rso:[''],
      outside_barricade:[''],
      inside_barricade:[''],
      radition_safe_condition:[''],

      facility_representative_name:[''],
      facility_representative_employee_number:[''],
      facility_representative_employee_number_sign:[''],
      facility_rep_date:[this.formattedDate],
      facility_rep_time:[this.formattedTime],
      job_facility_representative_name:[''],
      job_facility_representative_employee_number:[''],
      job_facility_representative_employee_number_sign:[''],
      job_rep_date:[this.formattedDate],
      job_rep_time:[this.formattedTime],
      date_lock_date:[this.formattedDate],
      date_lock_time:[this.formattedTime],
  })
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

}
