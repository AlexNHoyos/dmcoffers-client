import { TestBed, fakeAsync, tick } from "@angular/core/testing";

import { HostingDetailComponent } from "src/app/aplicacion/hosting/hosting-detail/hosting-detail.component";
import { ComponentFixture } from "@angular/core/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";

import { of } from "rxjs";

describe("HostingDetailComponent", () => {
  let component: HostingDetailComponent;
  let fixture: ComponentFixture<HostingDetailComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<HostingDetailComponent>> = jasmine.createSpyObj('MatDialogRef', ['close', 'afterClosed']);
  const mockDialogData = { hostingName: "Detalles del hosting" };

  beforeEach(fakeAsync(async () => {
    await TestBed.configureTestingModule({
      declarations: [HostingDetailComponent],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ],
      imports: [NoopAnimationsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(HostingDetailComponent);
    component = fixture.componentInstance;
  }));

  it("Debería crear el componente", () => {
    expect(component).toBeTruthy();
  });

  it("Debería mostrar el nombre del hosting en el título", () => {
    const titleElement = fixture.nativeElement.querySelector("h1");
    expect(titleElement.textContent).toContain(mockDialogData.hostingName);
  });

  it("Debería llamar a onClose cuando el diálogo se cierra sin confirmación", fakeAsync(() => {
    spyOn(component, "onClose");

    const button = fixture.nativeElement.querySelectorAll("button");
    const cancelButton = Array.from(button).find((btn) => (btn as HTMLButtonElement).textContent?.trim() === "Close") as HTMLButtonElement | undefined;

    expect(cancelButton).toBeTruthy();
    cancelButton!.click();
    tick();

    expect(component.onClose).toHaveBeenCalled();
  }));
});