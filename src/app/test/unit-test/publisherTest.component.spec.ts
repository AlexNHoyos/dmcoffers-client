import { TestBed, ComponentFixture, fakeAsync, tick } from "@angular/core/testing";

import { PublisherDeleteComponent } from "src/app/aplicacion/publishers/publisher-delete/publisher-delete.component";

import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";

import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";

describe("PublisherDeleteComponent", () => {
  let component: PublisherDeleteComponent;
  let fixture: ComponentFixture<PublisherDeleteComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<PublisherDeleteComponent>> = jasmine.createSpyObj('MatDialogRef', ['close', 'afterClosed']);
  const mockDialogData = { publisherName: "Test Publisher" };

  beforeEach(fakeAsync(async () => {
    await TestBed.configureTestingModule({
      declarations: [PublisherDeleteComponent],
      imports: [
        FormsModule,
        NoopAnimationsModule,
        MatCardModule,
        MatFormFieldModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(PublisherDeleteComponent);
    component = fixture.componentInstance;
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("Debería llamar a onCancel cuando se cierra el diálogo sin confirmar", fakeAsync(() => {
    spyOn(component, "onCancel");
    
    const button = fixture.nativeElement.querySelectorAll("button");
    const cancelButton = Array.from(button).find((btn) => (btn as HTMLButtonElement).textContent?.trim() === "Close") as HTMLButtonElement | undefined;

    expect(cancelButton).toBeTruthy();
    cancelButton!.click();
    tick();

    expect(component.onCancel).toHaveBeenCalled();
  }));
});
