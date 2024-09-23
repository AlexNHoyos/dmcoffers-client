import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { LoginComponent } from './auth/login/login.component';
import { NavComponent } from './shared/nav/nav.component';
import { PersonalDetailsComponent } from './components/personal-details/personal-details.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { AlertService } from './components/alert/alert.service';

import { JwtInterceptorService } from './services/auth/jwt-interceptor.service';
import { ErrorInterceptorService } from './services/auth/error-interceptor.service';

import { PublisherService } from './aplicacion/publishers/publisher.service';
import { PublisherComponent } from './aplicacion/publishers/publishers.component';
import { PublisherCreateComponent } from './aplicacion/publishers/publisher-create/publisher-create.component';
import { PublisherUpdateComponent } from './aplicacion/publishers/publisher-update/publisher-update.component';
import { PublisherDeleteComponent } from './aplicacion/publishers/publisher-delete/publisher-delete.component';
import { PublisherDetailComponent } from './aplicacion/publishers/publisher-detail/publisher-detail.component';
import { CategoriasComponent } from './aplicacion/categorias/categorias.component';
import { CategoriaCreateComponent } from './aplicacion/categorias/categoria-create/categoria-create.component';
import { CategoriaDeleteComponent } from './aplicacion/categorias/categoria-delete/categoria-delete.component';
import { CategoriaDetailComponent } from './aplicacion/categorias/categoria-detail/categoria-detail.component';
import { CategoriaUpdateComponent } from './aplicacion/categorias/categoria-update/categoria-update.component';
import { CategoriaService } from './aplicacion/categorias/categoria.service';
import { DesarrolladoresComponent } from './aplicacion/desarrolladores/desarrolladores.component';
import { DesarrolladoresService } from './aplicacion/desarrolladores/desarrolladores.service';
import { DesarrolladoresCreateComponent } from './aplicacion/desarrolladores/desarrolladores-create/desarrolladores-create.component';
import { DesarrolladoresUpdateComponent } from './aplicacion/desarrolladores/desarrolladores-update/desarrolladores-update.component';
import { DesarrolladoresDeleteComponent } from './aplicacion/desarrolladores/desarrolladores-delete/desarrolladores-delete.component';
import { HostingComponent } from './aplicacion/hosting/hosting.component';
import { HostingCreateComponent } from './aplicacion/hosting/hosting-create/hosting-create.component';
import { HostingDeleteComponent } from './aplicacion/hosting/hosting-delete/hosting-delete.component';
import { HostingDetailComponent } from './aplicacion/hosting/hosting-detail/hosting-detail.component';
import { HostingUpdateComponent } from './aplicacion/hosting/hosting-update/hosting-update.component';

@NgModule({
  declarations: [
    AppComponent,
    ErrorDialogComponent,
    DashboardComponent,
    FooterComponent,
    HeaderComponent,
    LoginComponent,
    NavComponent,
    PersonalDetailsComponent,
    ConfirmComponent,
    PublisherComponent,
    PublisherCreateComponent,
    PublisherUpdateComponent,
    PublisherDeleteComponent,
    PublisherDetailComponent,
    CategoriasComponent,
    CategoriaCreateComponent,
    CategoriaDeleteComponent,
    CategoriaDetailComponent,
    CategoriaUpdateComponent,
    DesarrolladoresComponent,
    DesarrolladoresCreateComponent,
    DesarrolladoresUpdateComponent,
    DesarrolladoresDeleteComponent,
    HostingComponent,
    HostingCreateComponent,
    HostingDeleteComponent,
    HostingDetailComponent,
    HostingUpdateComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
  ],

  providers: [
    PublisherService,
    CategoriaService,
    AlertService,
    DesarrolladoresService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptorService,
      multi: true,
    },
  ],

  bootstrap: [AppComponent],
})
export class AppModule { }
