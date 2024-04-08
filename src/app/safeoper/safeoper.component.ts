import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SafeoperService } from '@app/utils/service/safeoper.service';
@Component({
  selector: 'app-safeoper',
  templateUrl: './safeoper.component.html',
  styleUrls: ['./safeoper.component.css']
})
export class SafeoperComponent implements OnInit {
  @Input() saferoperformenable: boolean;
  devaitionformenable: boolean = true;
  FirstForm: FormGroup;
  constructor(private fb: FormBuilder,
    private apiService:SafeoperService,
    private router: Router,
    private toast: MatSnackBar,
    ) { }

    ngOnInit(): void {
      this.FirstForm = this.fb.group({
        steam_drum_level: [false],
        furnacedraft: [false],
        fuel_gas_system: [false],
        furnace_area_is_cleared: [false]
    })
    }
    submit() {
      if (this.FirstForm.valid) {
        const formData = this.FirstForm.value;
        this.apiService.savesafeoperpage(formData).subscribe(
          (response) => {
            // Handle successful response
            console.log('Data saved successfully:', response);
            this.toast.open('Data saved successfully', 'Close', { duration: 3000 });
            // Redirect to another route if needed
           // this.router.navigate(['/success']);
         
          },
          (error) => {
            // Handle error
            console.error('Error saving data:', error);
            this.toast.open('Error saving data', 'Close', { duration: 3000 });
          }
        );
      } else {
        // Form is invalid
        console.log('Form is invalid');
        this.toast.open('Please fill all required fields', 'Close', { duration: 3000 });
      }
    }
    showmsg(){
      this.toast.open('Please select "Agree" only.', 'Close', { duration: 3000 });
    }
    nxt(){
      this.devaitionformenable=false;
    }
  }
