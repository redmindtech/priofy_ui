import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-swpcloseout',
  templateUrl: './swpcloseout.component.html',
  styleUrls: ['./swpcloseout.component.css']
})
export class SwpcloseoutComponent implements OnInit {
  swpcloseout: FormGroup;
  constructor( private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.formInitialization()
  }
  formInitialization() {
    this.swpcloseout = this.formBuilder.group({
      Housekeeping:[null],
      jobandequipment:[null],
      Radioactive:[null],
      AreaEquipment:[null],
      closeoutstatus:['Pending']
 
    });
  }
}
