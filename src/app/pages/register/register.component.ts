import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@app/service/auth.service';
import Validation from '@app/utils/validation';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    document.querySelector('body')?.removeAttribute('class');
    document.querySelector('body')?.classList.add('hold-transition', 'register-page');
    this.form = this.formBuilder.group(
      {
        fullname: ['leenawat', Validators.required],
        username: [
          'leenawat',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20)
          ]
        ],
        email: ['leenawat.pa@gmail.com', [Validators.required, Validators.email]],
        password: [
          '123456',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40)
          ]
        ],
        confirmPassword: ['123456', Validators.required],
        acceptTerms: [true, Validators.requiredTrue]
      },
      {
        validators: [Validation.match('password', 'confirmPassword')]
      }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    console.log(JSON.stringify(this.form.value, null, 2));
    console.log({raw: this.form.getRawValue()})
    this.authService.register(this.form.getRawValue())
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }
}