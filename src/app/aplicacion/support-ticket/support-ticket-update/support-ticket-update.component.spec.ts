import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportTicketUpdateComponent } from './support-ticket-update.component';

describe('SupportTicketUpdateComponent', () => {
  let component: SupportTicketUpdateComponent;
  let fixture: ComponentFixture<SupportTicketUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SupportTicketUpdateComponent]
    });
    fixture = TestBed.createComponent(SupportTicketUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
