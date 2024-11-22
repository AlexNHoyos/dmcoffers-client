import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SweItemMenuComponent } from './sweitemmenu.component';

describe('SidemenuComponent', () => {
  let component: SweItemMenuComponent;
  let fixture: ComponentFixture<SweItemMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SweItemMenuComponent]
    });
    fixture = TestBed.createComponent(SweItemMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
