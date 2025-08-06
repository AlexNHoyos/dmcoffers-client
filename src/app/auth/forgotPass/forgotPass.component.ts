import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/auth/login.service';
import { MatDialog } from '@angular/material/dialog';
import { EncryptionService } from 'src/app/services/auth/encryption.service';
import { ErrorDialogComponent } from 'src/app/components/error-dialog/error-dialog.component';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgotPass.component.html',
  styleUrls: ['./forgotPass.component.scss'],
  standalone: false
})
export class ForgotPassComponent implements OnInit {
  forgotPassForm: FormGroup;
  email: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private dialog: MatDialog,
    private encryptionService: EncryptionService
  ) {
    this.forgotPassForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {}

  get emailControl() {
    return this.forgotPassForm.get('email');
  }

  forgotPass() {
    if (this.forgotPassForm.valid) {
      this.email = this.forgotPassForm.value.email;
      this.loginService.forgotPassword(this.email).subscribe({
        next: () => {
          this.dialog.open(ErrorDialogComponent, {
            data: {
              message: 'Se ha enviado un correo para recuperar la contraseña.'
            }
          });
          this.router.navigateByUrl('/login');
        },
        error: () => {
          this.dialog.open(ErrorDialogComponent, {
            data: {
              message: 'Error al enviar la solicitud de recuperación de contraseña.'
            }
          });
        }
      });
    }
  }
}