import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import ptBR from '../../assets/i18n/pt-BR.json';
import en from '../../assets/i18n/en.json';
import es from '../../assets/i18n/es.json';

export type Language = 'pt-BR' | 'en' | 'es';

@Injectable({
    providedIn: 'root'
})
export class LanguageService {
    private currentLanguageSubject = new BehaviorSubject<Language>('pt-BR');
    currentLanguage$: Observable<Language> = this.currentLanguageSubject.asObservable();

    private translations: Record<Language, Record<string, string>> = {
        'pt-BR': ptBR,
        'en': en,
        'es': es
    };

    constructor() {
        const savedLanguage = localStorage.getItem('language') as Language;
        if (savedLanguage && this.isValidLanguage(savedLanguage)) {
            this.setLanguage(savedLanguage);
        } else {
            const browserLang = navigator.language;
            if (browserLang.startsWith('pt')) {
                this.setLanguage('pt-BR');
            } else if (browserLang.startsWith('es')) {
                this.setLanguage('es');
            } else {
                this.setLanguage('pt-BR');
            }
        }
    }

    setLanguage(language: Language): void {
        if (!this.isValidLanguage(language)) {
            console.error(`Language "${language}" is not valid`);
            return;
        }
        this.updateLanguage(language);
    }

    private updateLanguage(language: Language): void {
        localStorage.setItem('language', language);
        this.currentLanguageSubject.next(language);
        document.documentElement.lang = language;
    }

    getCurrentLanguage(): Language {
        return this.currentLanguageSubject.value;
    }

    translate(key: string): string {
        const currentLang = this.getCurrentLanguage();
        return this.translations[currentLang][key] || key;
    }

    private isValidLanguage(language: string): language is Language {
        return ['pt-BR', 'en', 'es'].includes(language);
    }
}
