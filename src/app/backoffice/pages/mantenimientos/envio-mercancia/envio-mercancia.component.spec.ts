import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvioMercanciaComponent } from './envio-mercancia.component';

describe('EnvioMercanciaComponent', () => {
  let component: EnvioMercanciaComponent;
  let fixture: ComponentFixture<EnvioMercanciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnvioMercanciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvioMercanciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
