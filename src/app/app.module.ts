import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PublisherService } from './publisher.service';
import { PublisherListComponent } from './publisher-list/publisher-list.component';

@NgModule({
  declarations: [AppComponent, PublisherListComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [PublisherService],
  bootstrap: [AppComponent],
})
export class AppModule {}
