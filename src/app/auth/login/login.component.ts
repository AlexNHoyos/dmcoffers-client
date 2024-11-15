import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/auth/login.service';
import { LoginRequest } from '../../models/loginRequest';
import { ErrorDialogComponent } from 'src/app/components/error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { EncryptionService } from 'src/app/services/auth/encryption.service';

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
    private dialog: MatDialog,
    private loginService: LoginService
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]], //Validadores requeridos
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  get username() {
    return this.loginForm.controls['username'];
  }

  get password() {
    return this.loginForm.controls['password'];
  }

  login() {
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value as LoginRequest).subscribe({
        next: (userData) => {},
        error: (errorData) => {
          console.log(errorData);
          this.showErrorDialog(errorData);
          this.loginError = errorData;
        },
        complete: () => {
          this.router.navigateByUrl('/inicio');
          this.loginForm.reset();
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
      this.showErrorDialog('Error al ingresar los datos.');
    }
  }

  private showErrorDialog(errorMessage: string): void {
    this.dialog.open(ErrorDialogComponent, {
      data: { message: errorMessage, type: 'error' },
    });
  }
}
