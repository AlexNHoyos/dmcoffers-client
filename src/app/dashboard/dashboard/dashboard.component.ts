import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  pageurl: SafeResourceUrl;
  show: boolean = false;
  formulario: FormGroup;
  loading: boolean;

  constructor(private httpClient: HttpClient, private fb: FormBuilder,) {
    this.createForm();
  }

  createForm() {
    this.formulario = this.fb.group({
      nombre: ['',],
      descripcion: ['',],
    })
  }

  ngOnInit() {
  }

  showUrl(event): void {
    this.pageurl = event.srcIframe;
    this.show = true;
  }

  cleanFilter() {
    this.show = false;
    this.loading = false;
  }

  cargando(event): void {
    this.loading = event.loading;
  }
}
