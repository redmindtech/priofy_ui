import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-processingswp',
  templateUrl: './processingswp.component.html',
  styleUrls: ['./processingswp.component.css']
})
export class ProcessingswpComponent implements OnInit {
  Safeworkpermit!: FormGroup;

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
      special_instructions:['']

  })
  }
}
