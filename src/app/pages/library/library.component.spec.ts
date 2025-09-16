import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { LibraryComponent } from './library.component';
import { MatProgressSpinner, MatProgressSpinnerModule, MatSpinner } from '@angular/material/progress-spinner';

describe('LibraryComponent', () => {
  let component: LibraryComponent;
  let fixture: ComponentFixture<LibraryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LibraryComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ],
      imports: [
        MatDialogModule,MatProgressSpinner
      ]
    });
    fixture = TestBed.createComponent(LibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
