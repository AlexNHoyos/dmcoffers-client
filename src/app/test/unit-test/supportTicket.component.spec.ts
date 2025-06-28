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
import { MatTableModule } from "@angular/material/table";

import { of } from "rxjs";

describe("SupportTicketComponent", () => {
  let component: SupportTicketComponent;
  let fixture: ComponentFixture<SupportTicketComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<SupportTicketComponent>> = jasmine.createSpyObj('MatDialogRef', ['close', 'afterClosed']);
  const mockDialogData = { ticketId: "12345" };

  beforeEach(fakeAsync(async () => {
    await TestBed.configureTestingModule({
      declarations: [SupportTicketComponent],
      imports: [
        FormsModule,
        NoopAnimationsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatTableModule,
        MatButtonModule,
        MatIconModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(SupportTicketComponent);
    component = fixture.componentInstance;

    // Simular que la tabla está visible y tiene datos
    component.supportTickets = [
      {
        id: 1, creationuser: 'Usuario1',
        status: false,
        creationtimestamp: null,
        description: ""
      }
    ];
    component.showTable = true;

    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("Debería mostrar los detalles del ticket cuando se hace click en showDetails", fakeAsync(() => {
    spyOn(component, "showDetails");

    fixture.detectChanges(); // Asegura que el DOM esté actualizado

    const button = fixture.nativeElement.querySelector('button.showDetails');
    expect(button).toBeTruthy();

    button.click();
    tick();

    expect(component.showDetails).toHaveBeenCalledWith(1);
  }));
});
