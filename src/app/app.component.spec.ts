import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LoginService } from './services/auth/login.service';

describe('AppComponent', () => {
  let service: LoginService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        NoopAnimationsModule,
        MatCardModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule
      ],
      declarations: [AppComponent],
      providers: [
        LoginService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting() 
      ]
    }).compileComponents();

    service = TestBed.inject(LoginService);
  });

 
  it('Debería crear la aplicación', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('Debería crear el título dmcoffers-client', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('dmcoffers-client');
  });

  it('Debería renderizar el título', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('dmcoffers-client app is running!');
  });
});
