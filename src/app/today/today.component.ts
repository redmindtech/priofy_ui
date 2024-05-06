import { OnInit } from '@angular/core';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '@app/service/auth.service';
import { FirstpageService } from '@app/utils/service/firstpage.service';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.css']
})
export class TodayComponent implements OnInit {
 
  nextformenable: boolean = true;
  FirstForm: FormGroup; 
  currentUser: any;
  expand: boolean;
  open:boolean=true;
  printexpand: boolean;
  
  constructor(private fb: FormBuilder, 
    private apiService: FirstpageService,
    private router: Router,
    private toast: MatSnackBar,
    private authService: AuthService
    ) { }

  ngOnInit(): void {
    // const storedUser = localStorage.getItem('currentUser');

    //  this.currentUser = storedUser ? JSON.parse(storedUser) : null;
    //  console.log(' this.currentUser: ',  this.currentUser);
    

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
    comfort_mask: [false, Validators.required],
    cooling_vest: [false, Validators.required] ,
    plenty: [false, Validators.required] ,
    peak_summer: [false, Validators.required] ,
    neutral_body: [false, Validators.required],
     leather_gloves: [false, Validators.required] ,
     userid:[1],
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
    showmsg(){
      this.toast.open('Please select "Agree" only.', 'Close', { duration: 3000 });
    }
    nxt(){
      this.nextformenable=false;
      this.expand=true;
     this.open=false
    }
    printAndChange() {
      this.open = true;
      if (this.open) {
          setTimeout(() => {
            var printButton = document.getElementById("print-button");
            var mat0 = document.getElementById("header");
            var mat1 = document.getElementById("header1");
            // var mat1 = document.getElementById("mat-expansion-panel-header-1");
            // var mat2 = document.getElementById("mat-expansion-panel-header-2");
            // var mat3 = document.getElementById("mat-expansion-panel-header-3");
          
          
            if (printButton !== null) {
              printButton.style.display = "none";
            }
            if (mat0 !== null) {
              mat0.style.color = "black";
              
            } 
            if (mat1 !== null) {
              mat1.style.color = "black";
            }
            // if (mat2 !== null) {
            //   mat2.style.marginTop = "3%";
            // }
            // if (mat3 !== null) {
            //   mat3.style.marginTop = "15%";
            // }
            else {
              console.error("Print button not found!");
            }
          
              window.print();
          }, 2000);
  
          this.printexpand = true;
  
          setTimeout(() => {
              this.printexpand = false;
              this.open=false
              var printButton = document.getElementById("print-button");

              var mat0 = document.getElementById("header");
              var mat1 = document.getElementById("header1");
              console.log('mat0: ', mat0);

            //   var mat1 = document.getElementById("mat-expansion-panel-header-1");
            //   var mat2 = document.getElementById("mat-expansion-panel-header-2");
            // var mat3 = document.getElementById("mat-expansion-panel-header-3");
              console.log('printButton: ', printButton);
              if (printButton !== null) {
                printButton.style.display = "inline";
              } 
              if (mat0 !== null) {
                mat0.style.color = "white";
                
            }
            
            
              if (mat1 !== null) {
                mat1.style.color = "white";
              } 
              // if (mat2 !== null) {
              //   mat2.style.marginTop = "0";
              // }
              // if (mat3 !== null) {
              //   mat3.style.marginTop = "0";
              // }
              else {
                console.error("Print button not found!");
              }
          }, 5000);
      }
  }
  
     
}
