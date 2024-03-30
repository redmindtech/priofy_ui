import { OnInit } from '@angular/core';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FirstpageService } from '@app/utils/service/firstpage.service';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.css']
})
export class TodayComponent implements OnInit {
 
  nextformenable: boolean = true;
  FirstForm: FormGroup; 
  
  constructor(private fb: FormBuilder, 
    private apiService: FirstpageService,
    private router: Router,
    private toast: MatSnackBar,
    ) { }

  ngOnInit(): void {
    
this.formInitialization();
    
  }
formInitialization(){
  this.FirstForm = this.fb.group({ // Define form controls
    condensate: [false, Validators.required],
    protective_clothings: [false, Validators.required], 
    asphyxiant: [false, Validators.required], 
    frc: [false, Validators.required] ,
    gas_meter: [false, Validators.required] ,
    protection: [false, Validators.required] ,
    comfort_mask: [false, Validators.required] ,
    cooling_vest: [false, Validators.required] ,
    plenty: [false, Validators.required] ,
    peak_summer: [false, Validators.required] ,
    neutral_body: [false, Validators.required],
     leather_gloves: [false, Validators.required] ,
     userid:[1]
  });
    }
    isFormValid(): boolean {
      const formValues = this.FirstForm.value;
      for (const key in formValues) {
        if (formValues.hasOwnProperty(key) && key !== 'userid' && formValues[key] !== true) {
          return false;
        }
      }
      return true;
    }
    
    
    
    
    submit(): void {
      if (this.FirstForm.valid) {
        const firstFormValue = this.FirstForm.value;
        console.log('Form Data:', firstFormValue);
        this.apiService.savefirstpage(firstFormValue).subscribe(
          (response) => {
            console.log('Response from server:', response);
            this.nextformenable=false;
            // this.router.navigate(['/main/toolcomp']);
            
         
          },
          (error) => {
            console.error('Error while sending data:', error);
            
          }
        );
      } else {
       
        
        console.error('Form is invalid. Please fill all required fields.');
      }
     
 
    }
    
}
