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
  }));
    it("should create", () => {
        expect(component).toBeTruthy();
    });
    it("Debería mostrar los detalles del ticket cuando se hace click en showDetails", fakeAsync(() => {
        spyOn(component, "showDetails");

        const button = fixture.nativeElement.querySelectorAll("button");
        const detailsButton = Array.from(button).find((btn) => (btn as HTMLButtonElement).textContent?.trim() === "Show Details") as HTMLButtonElement | undefined;

        expect(detailsButton).toBeTruthy();
        detailsButton!.click();
        tick();

        expect(component.showDetails).toHaveBeenCalled();
    }));
});