import { TestBed, ComponentFixture, fakeAsync, tick } from "@angular/core/testing";

import { SupportTicketComponent } from "src/app/aplicacion/support-ticket/support-ticket.component";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";

import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

import { of } from "rxjs";