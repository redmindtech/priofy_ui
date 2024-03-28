import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-startup',
  templateUrl: './startup.component.html',
  styleUrls: ['./startup.component.css']
})
export class StartupComponent implements OnInit {
  FirstForm: FormGroup;
  constructor(private fb: FormBuilder,
   
    private router: Router,
    private toast: MatSnackBar,
    ) { }

    ngOnInit(): void {
      this.FirstForm = this.fb.group({
        furnace: [false],
        PFIC: [false],
        close: [false],
        TLEs: [false],
        drum: [false]
      });
    }
    submit() {
      if (this.FirstForm.valid) {
        const formData = this.FirstForm.value;
        // this.apiService.savestratuppage(formData).subscribe(
        //   (response) => {
        //     // Handle successful response
        //     console.log('Data saved successfully:', response);
        //     this.toast.open('Data saved successfully', 'Close', { duration: 3000 });
        //     // Redirect to another route if needed
        //     this.router.navigate(['/success']);
        //   },
        //   (error) => {
        //     // Handle error
        //     console.error('Error saving data:', error);
        //     this.toast.open('Error saving data', 'Close', { duration: 3000 });
        //   }
        // );
      } else {
        // Form is invalid
        console.log('Form is invalid');
        this.toast.open('Please fill all required fields', 'Close', { duration: 3000 });
      }
    }

  }
