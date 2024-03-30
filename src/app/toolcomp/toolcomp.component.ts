import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToolcompService } from '@app/utils/service/toolcomp.service';

@Component({
  selector: 'app-toolcomp',
  templateUrl: './toolcomp.component.html',
  styleUrls: ['./toolcomp.component.css']
})
export class ToolcompComponent implements OnInit {
  @Input() nextformenable: boolean;
  startupformenable: boolean = true;
  
  FirstForm: FormGroup;
  constructor(private fb: FormBuilder,
    private apiService: ToolcompService,
    private router: Router,
    private toast: MatSnackBar,
    ) { }

ngOnInit(): void {

  this.formInitialization();
  this.startupformenable=true;
  console.log(' this.nextformenable: ',  this.nextformenable);

    }
  formInitialization(){
    this.FirstForm = this.fb.group({ // Define form controls
    pipe_wrench: ['', Validators.required],
    valveKey : ['', Validators.required],
    radio: ['', Validators.required],
    lel_meter: ['', Validators.required],
    manual: ['', Validators.required],
     mono_goggles: ['', Validators.required],
     frcs: ['', Validators.required],
     earplug: ['', Validators.required],
     leather_gloves: ['', Validators.required],
     helmet: ['', Validators.required],
     safety_shoes: ['', Validators.required],
     safety_glass: ['', Validators.required],
     cooling_vest: ['', Validators.required],
     utility_hoses: ['', Validators.required],
     pipeComment:[''],
     valvekey_comment:[''],
     radio_comment:[''],
     lelComment:[''],
     manualComment:[''],
     monoComment:[''],
     frcs_Comment:[''],
     earplugComment:[''],
     leatherComment:[''],
     helmetComment:[''],
     safety_shoes_comment:[''],
     safety_glass_comment:[''],
     coolingComment:[''],
     utilityComment:[''],
     userid:[1],
    });
      }
submitprev()
{
this.router.navigate(['/today']);
}

submit() {


  console.log('Radio button value:', this.FirstForm.value);
  console.log('Form validity:', this.FirstForm.valid);

  // Send data to the API
  if (this.FirstForm.valid) {
    const firstFormValue = this.FirstForm.value;
  this.apiService.savesecondpage(firstFormValue).subscribe(
    response => {
      console.log('Data saved successfully:', response);
      this.startupformenable=false;
      //this.router.navigate(['/main/startup']);
      // You can add further logic here, such as showing a success message to the user
    },
    error => {
      console.error('Error saving data:', error);
      // You can handle errors here, such as showing an error message to the user
    }
  );
}
else {

  this.toast.open('Form is invalid. Please fill all required fields.', 'Close', {
    duration: 2000,
    panelClass: ['custom-toast'],
    verticalPosition: 'top'
    });
  console.error('Form is invalid. Please fill all required fields.');
}

}
}