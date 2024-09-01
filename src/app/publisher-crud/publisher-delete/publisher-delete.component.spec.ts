import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublisherDeleteComponent } from './publisher-delete.component';

describe('PublisherDeleteComponent', () => {
  let component: PublisherDeleteComponent;
  let fixture: ComponentFixture<PublisherDeleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublisherDeleteComponent]
    });
    fixture = TestBed.createComponent(PublisherDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
