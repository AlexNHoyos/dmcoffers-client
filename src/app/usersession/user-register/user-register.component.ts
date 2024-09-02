import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserSessionService } from '../usersession.service';
import { DatePipe } from '@angular/common';
import { User } from 'src/app/shared/models/user';
import { MatDatepickerInputEvent } from '@angular/material/datepicker/index.js';



@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['../../../assets/scss/styles.scss']
})

export class UserRegisterComponent implements OnInit {

  username: string;
  flagError: boolean;
  usuario: User = new User();
  mailError = true;
  backendErrorMessage: string;
  loading: boolean = false;
  formulario: FormGroup;

  constructor(
    private usersessionService: UserSessionService,
    private router: Router,
    private fb: FormBuilder,
    private datePipe: DatePipe
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

  selectFechaNacimiento(type: string, event: MatDatepickerInputEvent<Date>) {
    if (type !== 'input') {
      let date = this.transformDate(event.value);
      this.formulario.controls['fechaDesdeTxt'].setValue(date);
      this.usuario.birthDate = event.value;
    } else {
      var fechaDesde = this.formulario.get('fechaDesdeTxt').value.split("/");
      let year = Number(fechaDesde[2]);
      let month = Number(fechaDesde[1]) - 1;
      let day = Number(fechaDesde[0]);
      var date = new Date(year, month, day);
      if (!this.formulario.get('fechaDesdeTxt').hasError('dateValidator')) {
        this.formulario.controls['fechaDesdePicker'].setValue(date);
        this.usuario.birthDate = event.value;
      }
    }
  }

  filterFechaDesde = (d: Date | null): boolean => {
    return (!this.formulario.controls['fechaDesdeTxt'].value) || (d && d <= new Date(this.formulario.controls['fechaDesdeTxt'].value));
  };

  public transformDate(date): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy');
  }

  invDate(date): string {
    return this.datePipe.transform(date, 'yyyy/MM/dd');
  }
}
