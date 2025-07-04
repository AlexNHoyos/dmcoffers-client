import { ComponentFixture, TestBed, tick, fakeAsync } from "@angular/core/testing";

import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";  
import { provideHttpClientTesting } from "@angular/common/http/testing";

import { DesarrolladoresCreateComponent } from "src/app/aplicacion/desarrolladores/desarrolladores-create/desarrolladores-create.component";

import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatDatepickerModule } from "@angular/material/datepicker";

import { FormsModule } from "@angular/forms";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { of } from "rxjs";
import { MatNativeDateModule } from "@angular/material/core";

describe("DesarrolladoresCreateComponent", () => {
  let component: DesarrolladoresCreateComponent;
  let fixture: ComponentFixture<DesarrolladoresCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DesarrolladoresCreateComponent],
      imports: [
        FormsModule, 
        NoopAnimationsModule, 
        MatDialogModule,
        MatCardModule,
        MatInputModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DesarrolladoresCreateComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    if (fixture) {
      fixture.destroy();
    }
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("Debería deshabilitar el botón de guardar si el formulario es inválido", fakeAsync(() => {
    fixture.detectChanges();
    tick();
    const submitButton = fixture.nativeElement.querySelector("button[type='submit']");
    expect(submitButton.disabled).toBeFalse();
  }));
});
