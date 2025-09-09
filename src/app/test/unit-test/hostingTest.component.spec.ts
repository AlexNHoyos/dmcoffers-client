import { TestBed, fakeAsync, tick } from "@angular/core/testing";

import { HostingDetailComponent } from "src/app/aplicacion/hosting/hosting-detail/hosting-detail.component";
import { ComponentFixture } from "@angular/core/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardModule, MatCardSubtitle, MatCardTitle } from "@angular/material/card";
import { MatIcon, MatIconModule } from "@angular/material/icon";


describe("HostingDetailComponent", () => {
  let component: HostingDetailComponent;
  let fixture: ComponentFixture<HostingDetailComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<HostingDetailComponent>> = jasmine.createSpyObj('MatDialogRef', ['close', 'afterClosed']);
  const mockDialogData = {
    hosting: {
      id: 1,
      name: 'Servidor Test',
      status: true,
      creationtimestamp: new Date().toISOString(),
      modificationtimestamp: null,
      creationuser: 'admin',
      modificationuser: null
    }
  };

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      declarations: [HostingDetailComponent],
      imports: [NoopAnimationsModule, MatCardModule, MatIconModule],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HostingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // importantísimo para renderizar con data
  });

  afterEach(() => {
    if (fixture) {
      fixture.destroy();
    }
  });

  it('Debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Debería mostrar el nombre del hosting en el título', () => {
    const titleElement = fixture.nativeElement.querySelector('mat-card-title');
    expect(titleElement.textContent).toContain(mockDialogData.hosting.name);
  });

  it("Debería llamar a onClose cuando el diálogo se cierra sin confirmación", fakeAsync(() => {
  spyOn(component, 'onClose');

      const button = fixture.nativeElement.querySelector('button');
      expect(button).toBeTruthy();
      button.click();
      tick();

      expect(component.onClose).toHaveBeenCalled();
  }));
});