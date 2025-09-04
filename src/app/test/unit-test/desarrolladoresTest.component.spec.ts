import { ComponentFixture, TestBed, tick, fakeAsync } from "@angular/core/testing";

import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";  
import { provideHttpClientTesting } from "@angular/common/http/testing";

import { DesarrolladoresCreateComponent } from "src/app/aplicacion/desarrolladores/desarrolladores-create/desarrolladores-create.component";

import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatDatepickerModule } from "@angular/material/datepicker";

import { ReactiveFormsModule } from "@angular/forms";

import { FormsModule } from "@angular/forms";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { of } from "rxjs";
import { MatNativeDateModule } from "@angular/material/core";

describe("DesarrolladoresCreateComponent", () => {
  let component: DesarrolladoresCreateComponent;
  let fixture: ComponentFixture<DesarrolladoresCreateComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<DesarrolladoresCreateComponent>> = jasmine.createSpyObj('MatDialogRef', ['close', 'afterClosed']);

  const mockDialogData = {
    desarrollador: { id: 1, name: 'Desarrollador Test', creationuser: 'testUser', creationtimestamp: new Date().toISOString() }
  };

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
        MatNativeDateModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: { mockDialogData } },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DesarrolladoresCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    if (fixture) {
      fixture.destroy();
    }
  });

  it("Debería crear el componente", () => {
    expect(component).toBeTruthy();
  });

  it("Debería deshabilitar el botón de guardar si el formulario es inválido", fakeAsync(() => {
    fixture.detectChanges();
    tick();
    const submitButton = fixture.nativeElement.querySelector("button[type='submit']");
    expect(submitButton.disabled).toBeTrue();
  }));
});
