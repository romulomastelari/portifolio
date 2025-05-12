import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {TranslatePipe} from "../../pipes/translate.pipe";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faGithub, faInstagram, faLinkedin, faWhatsapp} from "@fortawesome/free-brands-svg-icons";
import emailjs from '@emailjs/browser';
import {EMAILJS_KEYS} from "../../../environments/emailjs-keys";

@Component({
    selector: 'app-contact',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, TranslatePipe, FaIconComponent],
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
    contactForm: FormGroup;
    submitted = false;
    success = false;
    error = false;
    loading = false;
    errorMessage = '';

    protected readonly faGithub = faGithub;
    protected readonly faInstagram = faInstagram;
    protected readonly faLinkedin = faLinkedin;
    protected readonly faWhatsapp = faWhatsapp;

    constructor(
        private fb: FormBuilder,
    ) {
        this.contactForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(2)]],
            email: ['', [Validators.required, Validators.email]],
            subject: ['', Validators.required],
            message: ['', [Validators.required, Validators.minLength(10)]]
        });
    }

    ngOnInit(): void {
        emailjs.init(EMAILJS_KEYS.publicKey);
    }

    onSubmit() {
        this.submitted = true;
        this.error = false;
        this.success = false;
        this.errorMessage = '';

        if (this.contactForm.valid) {
            this.loading = true;

            emailjs.send(
                EMAILJS_KEYS.serviceId,
                EMAILJS_KEYS.templateId,
                this.contactForm.value
            )
                .then((response) => {
                    this.success = true;
                    this.loading = false;
                    this.contactForm.reset();
                    this.submitted = false;

                    setTimeout(() => {
                        this.success = false;
                    }, 5000);
                })
                .catch((err) => {
                    console.error('FALHOUUUU...', err);
                    this.error = true;
                    this.loading = false;
                    this.errorMessage = err.text || 'Failed to send message. Please try again later.';
                });
        }
    }

    isFieldInvalid(field: string) {
        const formControl = this.contactForm.get(field);
        return formControl && formControl.invalid && (formControl.dirty || formControl.touched || this.submitted);
    }
}
