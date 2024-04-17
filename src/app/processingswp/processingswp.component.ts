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
      red_tag:['white tag'],
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
      retest_2_others:['']
  })
  }
}
