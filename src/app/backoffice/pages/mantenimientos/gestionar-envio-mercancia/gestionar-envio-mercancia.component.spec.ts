import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarEnvioMercanciaComponent } from './gestionar-envio-mercancia.component';

describe('GestionarEnvioMercanciaComponent', () => {
  let component: GestionarEnvioMercanciaComponent;
  let fixture: ComponentFixture<GestionarEnvioMercanciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionarEnvioMercanciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionarEnvioMercanciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
