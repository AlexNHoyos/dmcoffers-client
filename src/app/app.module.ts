import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { LoginComponent } from './auth/login/login.component';
import { NavComponent } from './shared/nav/nav.component';
import { PersonalDetailsComponent } from './components/personal-details/personal-details.component';
import { PublisherService } from './services/publisher/publisher.service';
import { PublisherUpdateComponent } from './publisher-crud/publisher-update/publisher-update.component';
import { PublisherDeleteComponent } from './publisher-crud/publisher-delete/publisher-delete.component';
import { PublisherCreateComponent } from './publisher-crud/publisher-create/publisher-create.component';
import { PublisherDetailComponent } from './publisher-crud/publisher-detail/publisher-detail.component';
import { PublisherListComponent } from './publisher-crud/publisher-list/publisher-list.component';
import { JwtInterceptorService } from './services/auth/jwt-interceptor.service';
import { ErrorInterceptorService } from './services/auth/error-interceptor.service';
import { PublisherCrudComponent } from './publisher-crud/publisher-crud/publisher-crud.component';

@NgModule({
  declarations: [
    AppComponent,
    PublisherListComponent,
    PublisherDetailComponent,
    PublisherCreateComponent,
    ErrorDialogComponent,
    PublisherDeleteComponent,
    PublisherUpdateComponent,
    DashboardComponent,
    FooterComponent,
    HeaderComponent,
    LoginComponent,
    NavComponent,
    PersonalDetailsComponent,
    PublisherCrudComponent,
  ],
  imports: [
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
  ],
  providers: [
    PublisherService,
    provideClientHydration(),
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
