import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneroDetailComponent } from './genero-detail.component';

describe('GeneroDetailComponent', () => {
  let component: GeneroDetailComponent;
  let fixture: ComponentFixture<GeneroDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneroDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneroDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
