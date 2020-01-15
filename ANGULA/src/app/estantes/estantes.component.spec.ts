import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstantesComponent } from './estantes.component';

describe('EstantesComponent', () => {
  let component: EstantesComponent;
  let fixture: ComponentFixture<EstantesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstantesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
