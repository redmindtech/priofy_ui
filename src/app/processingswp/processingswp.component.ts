import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-processingswp',
  templateUrl: './processingswp.component.html',
  styleUrls: ['./processingswp.component.css']
})
export class ProcessingswpComponent implements OnInit {
  Safeworkpermit!: FormGroup;
  // toppingList: string[] = ['CV-Closed Valve', 'OV-Open Valve', 'SB-Slip Blind', 'SR-Spool Removed', 'OP-One Plus', 'TL-Tag Lock'];
  formattedDate: string;
  formattedTime: string;
  showSignature: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    const currentDate = new Date();

// Format the date as needed (e.g., DD/MM/YYYY)
this.formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;


// Format the time as needed (e.g., HH:MM:SS)
this.formattedTime = `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;


// Combine date and time



    this.formInitialization();
  }
  formInitialization(){
    this.Safeworkpermit = this.formBuilder.group({
     
      preparations_and_test:['vvvvvv'],
      house_keeping_instructions:['ballaa'],
      environmental_concerns:['ttt'],
      Physical_Hazards:['ggg'],
      chemicals_last_contained:['yyy'],
      inspection_required:['t'],
      checklists_Attachments_Required:['rr'],
      red_tag:[''],
      reason_for_work:['money'],
      work_description:['work is Done'],
      add_tag:['4'],
      facility_representative_sign:[''],
      job_representative_sign:[''],
      employee_number:[''],
      signature_other_unit_facility_representative:[''],
      isolating_and_securing:[''],
      hazards_energies:[''],
      residual_energy_material:[''],
      inspection_required_job:[''],
      inadvertent_operation:[''],
      special_instructions:[''],
      // toppings:[''],
      // location_of_red_tags:[''],
      // facilityrep_red_tag:[''],
      // lock_number:[''],
      tags_reconciled_signature:[''],
      tag_added_location:[''],
      tag_added_location_sign:[''],
      tag_deleted_location:[''],
      tag_deleted_location_sign:[''],
     initial_lel:[''],
      initial_oxygen:[''],
      initial_others:[''],
      Retest_1_oxygen:[''],
      retest_1_lel:[''],
      retest_1_others:[''],
      Retest_2_oxygen:[''],
      retest_2_lel:[''],
      retest_2_others:[''],
      equipment_prepared_facility_rep:[''],
      equipment_prepared_employee_number:[''],
      equipment_prepared_master_card_Number:[''],
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
      job_facility_representative_name:[''],
      job_facility_representative_employee_number:[''],
      job_facility_representative_employee_number_sign:[''],
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
}
