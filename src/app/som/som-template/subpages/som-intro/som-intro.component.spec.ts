import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SomIntroComponent } from './som-intro.component';

describe('SomIntroComponent', () => {
  let component: SomIntroComponent;
  let fixture: ComponentFixture<SomIntroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SomIntroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SomIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
