import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserSessionService } from '../usersession.service';



@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html'
})

export class UserRegisterComponent implements OnInit {

  username: string;
  flagError: boolean;
  mailError = true;
  backendErrorMessage: string;
  loading: boolean = false;
  formulario: FormGroup;

  constructor(
    private usersessionService: UserSessionService,
    private router: Router,
    private fb: FormBuilder
  ) {

    this.createForm();
  }

  ngOnInit() {

  }

  createForm() {
    this.formulario = this.fb.group({
      username: ['',],
      password: ['',],
      fechaDesdeTxt: ['',],
      fechaDesdePicker: ['',],
      nombre: ['',],
      apellido: ['',],
      email: ['',],
      telefono: ['',]
    })
  }
}
