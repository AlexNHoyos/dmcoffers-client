import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { RegisterService } from 'src/app/services/auth/register.service';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { UserService } from 'src/app/services/user/user.service';
import { Validators } from '@angular/forms';
import { ErrorDialogComponent } from 'src/app/components/error-dialog/error-dialog.component';
import { User } from '../auth.models';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  user: User;

  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private userService: UserService,
    private errorHandler: ErrorHandlerService,
    private dialog: MatDialog
  ) {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required]],
      realname: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      paswword: ['', [Validators.required]],
      password2: ['', [Validators.required]]
    });
    this.user = new User();
  }

  ngOnInit(): void { }

  get username() {
    return this.registerForm.controls['username'];
  }

  get password() {
    return this.registerForm.controls['password'];
  }

  get password2() {
    return this.registerForm.controls['password2'];
  }

  get email() {
    return this.registerForm.controls['email'];
  }

  register() {

  }

  private showErrorDialog(errorMessage: string): void {
    this.dialog.open(ErrorDialogComponent, {
      data: { message: errorMessage, type: 'error' },
    });
  }

}