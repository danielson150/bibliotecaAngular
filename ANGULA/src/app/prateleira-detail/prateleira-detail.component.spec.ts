import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrateleiraDetailComponent } from './prateleira-detail.component';

describe('PrateleiraDetailComponent', () => {
  let component: PrateleiraDetailComponent;
  let fixture: ComponentFixture<PrateleiraDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrateleiraDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrateleiraDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
