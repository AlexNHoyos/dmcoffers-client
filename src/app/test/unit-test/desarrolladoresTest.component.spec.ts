import { ComponentFixture, TestBed } from "@angular/core/testing";

import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";  
import { provideHttpClientTesting } from "@angular/common/http/testing";

import { DesarrolladoresCreateComponent } from "src/app/aplicacion/desarrolladores/desarrolladores-create/desarrolladores-create.component";

import { FormsModule } from "@angular/forms";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { of } from "rxjs";

describe("DesarrolladoresCreateComponent", () => {
  let component: DesarrolladoresCreateComponent;
  let fixture: ComponentFixture<DesarrolladoresCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DesarrolladoresCreateComponent],
      imports: [FormsModule, NoopAnimationsModule],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
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
});
