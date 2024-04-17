import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-processingswp',
  templateUrl: './processingswp.component.html',
  styleUrls: ['./processingswp.component.css']
})
export class ProcessingswpComponent implements OnInit {
  Safeworkpermit!: FormGroup;
  
  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
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
     
  })
  }
}
