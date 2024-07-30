import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PublisherService } from './publisher.service';
import { PublisherListComponent } from './publisher-list/publisher-list.component';

import { MatButtonModule } from '@angular/material/button';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { PublisherDetailComponent } from './publisher-detail/publisher-detail.component';
import { PublisherCreateComponent } from './publisher-create/publisher-create.component';

@NgModule({
  declarations: [
    AppComponent,
    PublisherListComponent,
    PublisherDetailComponent,
    PublisherCreateComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatDialogModule,
    MatTableModule,
  ],
  providers: [PublisherService],
  bootstrap: [AppComponent],
})
export class AppModule {}
