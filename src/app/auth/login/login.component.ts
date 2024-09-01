import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/auth/login.service';
import { LoginRequest } from '../../services/auth/loginRequest';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginError: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService
  ) {
    this.loginForm = this.formBuilder.group({
      user: ['user1234', [Validators.required]], //Validadores requeridos
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  get user() {
    return this.loginForm.controls['user'];
  }

  get password() {
    return this.loginForm.controls['password'];
  }

  login() {
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value as LoginRequest).subscribe({
        next: (userData) => {
          console.log(userData);
        },
        error: (errorData) => {
          console.log(errorData);
          this.loginError = errorData;
        },
        complete: () => {
          console.log('El login está completo');
          this.router.navigateByUrl('/Inicio');
          this.loginForm.reset();
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
      alert('Error al ingresar los datos.');
    }
  }
}

/*            <div *ngIf="user.hasError('minlength')">
              Name must be at least 4 characters long.
            </div>
            <div *ngIf="user.hasError('forbiddenName')">
              Name cannot be Bob.
            </div>*/
