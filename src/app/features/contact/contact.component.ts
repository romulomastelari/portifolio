import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {TranslatePipe} from "../../pipes/translate.pipe";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faGithub, faInstagram, faLinkedin, faWhatsapp} from "@fortawesome/free-brands-svg-icons";

@Component({
    selector: 'app-contact',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, TranslatePipe, FaIconComponent],
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
    contactForm: FormGroup;
    submitted = false;
    success = false;

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

    onSubmit() {
        this.submitted = true;

        if (this.contactForm.valid) {
            console.log( this.contactForm.value);
            this.success = true;
            this.contactForm.reset();
            this.submitted = false;

            setTimeout(() => {
                this.success = false;
            }, 5000);
        }
    }

    isFieldInvalid(field: string) {
        const formControl = this.contactForm.get(field);
        return formControl && formControl.invalid && (formControl.dirty || formControl.touched || this.submitted);
    }
}
