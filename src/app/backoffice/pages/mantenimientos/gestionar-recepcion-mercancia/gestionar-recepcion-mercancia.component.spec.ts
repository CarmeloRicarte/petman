import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarRecepcionMercanciaComponent } from './gestionar-recepcion-mercancia.component';

describe('GestionarRecepcionMercanciaComponent', () => {
  let component: GestionarRecepcionMercanciaComponent;
  let fixture: ComponentFixture<GestionarRecepcionMercanciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionarRecepcionMercanciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionarRecepcionMercanciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
