import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublisherCreateComponent } from './publisher-create.component';

describe('PublisherCreateComponent', () => {
  let component: PublisherCreateComponent;
  let fixture: ComponentFixture<PublisherCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublisherCreateComponent]
    });
    fixture = TestBed.createComponent(PublisherCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
