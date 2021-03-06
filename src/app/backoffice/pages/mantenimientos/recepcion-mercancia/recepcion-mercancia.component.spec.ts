import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecepcionMercanciaComponent } from './recepcion-mercancia.component';

describe('RecepcionMercanciaComponent', () => {
  let component: RecepcionMercanciaComponent;
  let fixture: ComponentFixture<RecepcionMercanciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecepcionMercanciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecepcionMercanciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
