import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SomTemplateComponent } from './som-template.component';

describe('SomTemplateComponent', () => {
  let component: SomTemplateComponent;
  let fixture: ComponentFixture<SomTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SomTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SomTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
