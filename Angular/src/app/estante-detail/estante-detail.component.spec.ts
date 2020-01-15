import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstanteDetailComponent } from './estante-detail.component';

describe('EstanteDetailComponent', () => {
  let component: EstanteDetailComponent;
  let fixture: ComponentFixture<EstanteDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstanteDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstanteDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
