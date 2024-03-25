import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService) {
    this.form = this.formBuilder.group({
      email: 'leenawat.pa@gmail.com',
      password: 'nestAbcd123$'
    });
    // authService.currentUser.subscribe(user => {
    //   if (user) {
    //     this.router.navigate(['/']);
    //   }
    // })
  }

  ngOnInit(): void {
    document.querySelector('body')?.removeAttribute('class');
    document.querySelector('body')?.classList.add('hold-transition', 'login-page');

  }

  submit() {
    console.log('submit')
    // const credential: Credential = this.form.getRawValue();
    // this.authService.login(credential)
    this.router.navigate(['']);
  }
}
