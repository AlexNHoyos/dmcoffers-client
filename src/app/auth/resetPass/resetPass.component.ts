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
})
export class ResetPassComponent implements OnInit {
  resetForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private dialog: MatDialog,
    private encryptionService: EncryptionService
  ) {
    this.resetForm = this.fb.group({
      token: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {}

  resetPass(){
    
  }
}
