import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublisherCrudComponent } from './publisher-crud.component';

describe('PublisherCrudComponent', () => {
  let component: PublisherCrudComponent;
  let fixture: ComponentFixture<PublisherCrudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublisherCrudComponent]
    });
    fixture = TestBed.createComponent(PublisherCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
