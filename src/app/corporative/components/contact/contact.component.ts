import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactService } from 'src/app/services/corporative-page/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit, OnDestroy {
  contactForm!: FormGroup;
  errorEnvio = false;
  mensajeEnviadoOk = false;

  constructor(private formBuilder: FormBuilder, private contactService: ContactService) { }

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      nombre: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      telefono: new FormControl('', Validators.required),
      asunto: new FormControl('', Validators.required),
      mensaje: new FormControl('', Validators.required)
    });
  }

  ngOnDestroy(): void {
    this.errorEnvio = false;
    this.mensajeEnviadoOk = false;
  }

  contactSubmit(): void {
    this.contactService.sendEmail(this.contactForm.value).then(
      (res) => {
        if (res.response.indexOf('OK') !== -1) {
          this.mensajeEnviadoOk = true;
          this.contactForm.reset();
        }
      },
      (error) => {
        console.error(error);
        if (this.mensajeEnviadoOk) {
          this.mensajeEnviadoOk = false;
        }
        this.errorEnvio = true;
        this.contactForm.reset();
      });
  }

  get getControl(): any {
    return this.contactForm.controls;
  }

}
