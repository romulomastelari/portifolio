import {Component, HostListener, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Language, LanguageService} from '../../services/language.service';

@Component({
    selector: 'app-language-switcher',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './language-switcher.component.html',
    styleUrls: ['./language-switcher.component.scss']
})
export class LanguageSwitcherComponent implements OnInit {
    currentLanguage: Language = 'en';
    languages: { id: Language; name: string; flag: string }[] = [
        {id: 'pt-BR', name: 'Português', flag: '🇧🇷'},
        {id: 'en', name: 'English', flag: '🇺🇸'},
        {id: 'es', name: 'Español', flag: '🇪🇸'}
    ];

    isOpen = false;

    constructor(private languageService: LanguageService) {
    }

    @HostListener('document:click', ['$event'])
    onDocumentClick(event: Event): void {
        const target = event.target as HTMLElement;
        if (!target.closest('.language-switcher')) {
            this.isOpen = false;
        }
    }

    @HostListener('document:wheel', ['$event'])
    onDocumentScroll(event: Event): void {
        this.isOpen = false;
    }

    ngOnInit(): void {
        this.languageService.currentLanguage$.subscribe(language => {
            this.currentLanguage = language;
        });
    }

    setLanguage(language: Language): void {
        this.languageService.setLanguage(language);
        this.isOpen = false;
    }

    toggleDropdown(): void {
        this.isOpen = !this.isOpen;
    }

    getCurrentLanguageFlag(): string {
        const language = this.languages.find(l => l.id === this.currentLanguage);
        return language ? language.flag : '🌐';
    }

    getCurrentLanguageName(): string {
        const language = this.languages.find(l => l.id === this.currentLanguage);
        return language ? language.name : 'Language';
    }
}
