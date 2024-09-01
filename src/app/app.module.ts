import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ReactiveFormsModule } from '@angular/forms';

import { PublisherService } from './publisher.service';
import { PublisherListComponent } from './publisher-crud/publisher-list/publisher-list.component';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { PublisherDetailComponent } from './publisher-crud/publisher-detail/publisher-detail.component';
import { PublisherCreateComponent } from './publisher-crud/publisher-create/publisher-create.component';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { PublisherDeleteComponent } from './publisher-crud/publisher-delete/publisher-delete.component';
import { PublisherUpdateComponent } from './publisher-crud/publisher-update/publisher-update.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { NavComponent } from './shared/nav/nav.component';
import { LoginComponent } from './auth/login/login.component';

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
  providers: [PublisherService, provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule {}
