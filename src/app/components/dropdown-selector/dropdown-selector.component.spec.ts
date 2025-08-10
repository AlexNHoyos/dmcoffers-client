import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownSelectComponent } from './dropdown-selector.component';

describe('DropdownSelectorComponent', () => {
  let component: DropdownSelectComponent;
  let fixture: ComponentFixture<DropdownSelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DropdownSelectComponent]
    });
    fixture = TestBed.createComponent(DropdownSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
