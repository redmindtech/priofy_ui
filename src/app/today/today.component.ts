import { Component, OnInit } from '@angular/core';
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
    condensate: ['', Validators.required],
    protective_clothings: ['', Validators.required], 
    asphyxiant: ['', Validators.required], 
    frc: ['', Validators.required] ,
    gas_meter: ['', Validators.required] ,
    protection: ['', Validators.required] ,
    comfort_mask: ['', Validators.required] ,
    cooling_vest: ['', Validators.required] ,
    plenty: ['', Validators.required] ,
    peak_summer: ['', Validators.required] ,
    neutral_body: ['', Validators.required],
     leather_gloves: ['', Validators.required] 
  });
    }
    submit(): void {
      if (this.FirstForm.valid) {
        const firstFormValue = this.FirstForm.value;
        console.log('Form Data:', firstFormValue);
        this.apiService.savefirstpage(firstFormValue).subscribe(
          (response) => {
            console.log('Response from server:', response);
            
            
            this.router.navigate(['/listpage']);
          },
          (error) => {
            console.error('Error while sending data:', error);
            
          }
        );
      } else {
       
        this.toast.open('Form is invalid. Please fill all required fields.', 'Close', {
          duration: 3000,
          panelClass: ['custom-toast'],
          verticalPosition: 'top'
          });
        console.error('Form is invalid. Please fill all required fields.');
      }
     
    }
}
