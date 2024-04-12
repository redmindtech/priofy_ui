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
  @Input() expand: boolean;
  startupformenable: boolean = true;
  open1 : boolean ;
  
  FirstForm: FormGroup;
  constructor(private fb: FormBuilder,
    private apiService: ToolcompService,
    private router: Router,
    private toast: MatSnackBar,
    ) { }

ngOnInit(): void {

  this.formInitialization();
  
  


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

    const firstFormValue = this.FirstForm.value;
  this.apiService.savesecondpage(firstFormValue).subscribe(
    response => {
      console.log('Data saved successfully:', response);
      
      //this.router.navigate(['/main/startup']);
      // You can add further logic here, such as showing a success message to the user
    },
    error => {
      console.error('Error saving data:', error);
      // You can handle errors here, such as showing an error message to the user
    }
  );


}
showmsg(){
  this.toast.open('Please select "Agree" only.', 'Close', { duration: 3000 });
}
nxt(){
  this.startupformenable=false;
  this.expand = false;
  this.open1 =true

}
}