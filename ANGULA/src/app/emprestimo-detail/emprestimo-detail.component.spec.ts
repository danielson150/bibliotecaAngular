import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmprestimoDetailComponent } from './emprestimo-detail.component';

describe('EmprestimoDetailComponent', () => {
  let component: EmprestimoDetailComponent;
  let fixture: ComponentFixture<EmprestimoDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmprestimoDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmprestimoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
