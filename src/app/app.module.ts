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

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { LoginComponent } from './auth/login/login.component';
import { NavComponent } from './shared/nav/nav.component';
import { PersonalDetailsComponent } from './components/personal-details/personal-details.component';
import { ConfirmComponent } from './components/confirm/confirm.component';

import { PublisherService } from './components/publishers/publisher.service';
import { JwtInterceptorService } from './services/auth/jwt-interceptor.service';
import { ErrorInterceptorService } from './services/auth/error-interceptor.service';
import { PublisherComponent } from './components/publishers/publishers.component';
import { PublisherCreateComponent } from './components/publishers/publisher-create/publisher-create.component';
import { AlertService } from './components/alert/alert.service';
import { PublisherUpdateComponent } from './components/publishers/publisher-update/publisher-update.component';
import { PublisherDeleteComponent } from './components/publishers/publisher-delete/publisher-delete.component';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';

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
    AlertService,

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
export class AppModule {}
