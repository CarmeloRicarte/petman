import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;
  errorEnvio = false;
  mensajeEnviadoOk = false;

  constructor(public formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      nombre: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      telefono: new FormControl('', Validators.required),
      asunto: new FormControl('', Validators.required),
      mensaje: new FormControl('', Validators.required)
    });
  }

  contactSubmit(): void {
    console.log(this.contactForm.value, this.contactForm.valid);
    this.mensajeEnviadoOk = true;
  }

  get getControl() {
    return this.contactForm.controls;
  }

}
