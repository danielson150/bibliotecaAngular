import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrateleirasComponent } from './prateleiras.component';

describe('PrateleirasComponent', () => {
  let component: PrateleirasComponent;
  let fixture: ComponentFixture<PrateleirasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrateleirasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrateleirasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
