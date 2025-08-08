import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/auth/login.service';
import { LoginRequest } from '../../models/loginRequest';
import { ErrorDialogComponent } from 'src/app/components/error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { EncryptionService } from 'src/app/services/auth/encryption.service';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './resetPass.component.html',
  standalone: false,
  styleUrls: ['./resetPass.component.scss']
})
export class ResetPassComponent implements OnInit {
  ResetPassForm: FormGroup;
  password: string = '';
  token: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private dialog: MatDialog,
    private encryptionService: EncryptionService
  ) {
    this.ResetPassForm = this.fb.group({
      token: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get tokenControl() {
    return this.ResetPassForm.get('token');
  }

  get newPasswordControl() {
    return this.ResetPassForm.get('newPassword');
  }

  ngOnInit(): void {}

  resetPass(){
    this.token = this.tokenControl?.value;
    this.password = this.newPasswordControl?.value;

    if (this.ResetPassForm.valid) {
      this.loginService.resetPassword(this.token, this.password).subscribe({
        next: () => {
          this.dialog.open(ErrorDialogComponent, {
            data: {
              message: 'Contraseña actualizada correctamente. Puedes iniciar sesión con tu nueva contraseña.'
            }
          });
        },
        error: () => {
          this.dialog.open(ErrorDialogComponent, {
            data: {
              message: 'Error al actualizar la contraseña. Por favor, verifica el token y vuelve a intentarlo.'
            }
          });
        }
      });
    }
  }
}
