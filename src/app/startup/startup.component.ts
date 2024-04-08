
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { StartsService } from '@app/utils/service/starts.service';


@Component({
  selector: 'app-startup',
  templateUrl: './startup.component.html',
  styleUrls: ['./startup.component.css']
})
export class StartupComponent implements OnInit {
  @Input() startupformenable: boolean;
  saferoperformenable: boolean = true;

  FirstForm: FormGroup;
  constructor(private fb: FormBuilder,
    private apiService: StartsService,
    private router: Router,
    private toast: MatSnackBar,
    ) { }

    ngOnInit(): void {
      this.FirstForm = this.fb.group({
        prepare_to_startup: [false],
        pfic: [false],
        prevent_leaks_or_spill: [false],
        thermal_liquid_exchangers: [false],
        tLE_blowdown_valves: [false]
      });
    }
    submit() {
      if (this.FirstForm.valid) {
        const formData = this.FirstForm.value;
        this.apiService.savestratuppage(formData).subscribe(
          (response) => {
            // Handle successful response
            console.log('Data saved successfully:', response);
            this.toast.open('Data saved successfully', 'Close', { duration: 3000 });
            // Redirect to another route if needed
           
            //this.router.navigate(['/success']);
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
      this.saferoperformenable=false;
    
    }
  }
