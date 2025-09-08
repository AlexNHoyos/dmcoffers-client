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
import { MatDialogModule } from "@angular/material/dialog";
import { MatSelectModule } from "@angular/material/select";

import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatOptionModule } from "@angular/material/core";


import { of } from "rxjs";
import { provideNativeDateAdapter } from "@angular/material/core";

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
        MatIconModule,
        MatDialogModule,
        MatExpansionModule,
        MatDatepickerModule,
        MatOptionModule,
        MatSelectModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideNativeDateAdapter()
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(SupportTicketComponent);
    component = fixture.componentInstance;

    // Simulate that the table is visible and has data
    component.supportTickets = [
      {
        id: 1, creationuser: 'Usuario1',
        status: false,
        creationtimestamp: null,
        description: ""
      }
    ];


    fixture.detectChanges();
  }));

  it("Debería crear el componente", () => {
    expect(component).toBeTruthy();
  });

  it("Debería mostrar los detalles del ticket cuando se hace click en showDetails", fakeAsync(() => {
    spyOn(component, "showDetails");
    
    // Set data and trigger change detection to render the table and button
    component.supportTickets = [
      {
        id: 1, creationuser: 'Usuario1',
        status: false,
        creationtimestamp: null,
        description: ""
      }
    ];
    
    component.filteredTickets = component.supportTickets;

    fixture.detectChanges();
    tick();

    const button = fixture.nativeElement.querySelector('button.showDetails');
    expect(button).toBeTruthy();

    button.click();
    tick();

    expect(component.showDetails).toHaveBeenCalledWith(1);
  }));
});
