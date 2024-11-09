import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { RegisterService } from 'src/app/services/auth/register.service';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { UserService } from 'src/app/services/user/user.service';
import { Validators } from '@angular/forms';
import { ErrorDialogComponent } from 'src/app/components/error-dialog/error-dialog.component';
import { User } from '../auth.models';
import { EncryptionService } from 'src/app/services/auth/encryption.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  user: User = new User();

  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private userService: UserService,
    private errorHandler: ErrorHandlerService,
    private dialog: MatDialog,
    private encryptionService: EncryptionService
  ) {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      realname: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      password: ['', [Validators.required]],
      password2: ['', [Validators.required]],
      birth_date: ['', [Validators.required]]
    });
    this.user = new User();
  }

  ngOnInit(): void { };

  register() {

    this.user.realname = this.registerForm.controls['realname'].value;
    this.user.surname = this.registerForm.controls['surname'].value;
    this.user.username = this.registerForm.controls['username'].value;
    this.user.creationuser = 'admin';
    this.user.creationtimestamp = new Date();
    this.user.modificationuser = 'admin';
    this.user.modificationtimestamp = new Date();
    this.user.status = true;
    this.user.password = this.encryptionService.encrypt(this.registerForm.controls['password'].value);
    this.user.birth_date = this.registerForm.controls['birth_date'].value;



    this.registerService.register(this.user).subscribe(data => {
    })
  }

  private showErrorDialog(errorMessage: string): void {
    this.dialog.open(ErrorDialogComponent, {
      data: { message: errorMessage, type: 'error' },
    });
  }

}