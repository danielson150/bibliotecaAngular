import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultaDetailComponent } from './multa-detail.component';

describe('MultaDetailComponent', () => {
  let component: MultaDetailComponent;
  let fixture: ComponentFixture<MultaDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultaDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
