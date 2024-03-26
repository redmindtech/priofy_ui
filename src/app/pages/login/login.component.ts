import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@app/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup;
  errorMessage: string;

  constructor(private formBuilder: FormBuilder, private authService: AuthService,  private router: Router) {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  submit() {
    if (this.form.valid) {
      const { username, password } = this.form.value;
      this.authService.login({ username, password }).subscribe(
        () => {
          console.log("hh");
          this.router.navigate(['/home']);
          // Login successful, redirect or perform necessary action
        },
        error => {
          this.errorMessage = 'Invalid username or password. Please try again.';
        }
      );
    } else {
      // Form is invalid, mark fields as touched to display validation errors
      this.markFormGroupTouched(this.form);
    }
  }

  // Function to mark all form fields as touched
  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
