import {Component, HostListener, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ThemeService, Theme} from '../../services/theme.service';
import {LanguageService} from "../../services/language.service";
import {TranslatePipe} from "../../pipes/translate.pipe";

@Component({
    selector: 'app-theme-switcher',
    standalone: true,
    imports: [CommonModule, TranslatePipe],
    templateUrl: './theme-switcher.component.html',
    styleUrls: ['./theme-switcher.component.scss']
})
export class ThemeSwitcherComponent implements OnInit {
    currentTheme: Theme = 'light-green';
    themes: { id: Theme; name: string; translateKey: string; icon: string }[] = [
        {id: 'light-green', name: 'Green', translateKey: 'themeGreen', icon: 'circle'},
        {id: 'light-blue', name: 'Blue', translateKey: 'themeBlue', icon: 'circle'},
        {id: 'light-red', name: 'Red', translateKey: 'themeRed', icon: 'circle'},
        {id: 'dark', name: 'Dark', translateKey: 'themeDark', icon: 'dark_mode'}
    ];

    isOpen = false;

    constructor(private themeService: ThemeService, private languageService: LanguageService) {
    }

    @HostListener('document:click', ['$event'])
    onDocumentClick(event: Event): void {
        const target = event.target as HTMLElement;
        if (!target.closest('.theme-switcher')) {
            this.isOpen = false;
        }
    }

    @HostListener('document:wheel', ['$event'])
    onDocumentScroll(event: Event): void {
        this.isOpen = false;
    }

    ngOnInit(): void {
        this.themeService.currentTheme$.subscribe(theme => {
            this.currentTheme = theme;
        });
    }

    setTheme(theme: Theme): void {
        this.themeService.setTheme(theme);
        this.isOpen = false;
    }

    toggleDropdown(): void {
        this.isOpen = !this.isOpen;
    }

    getCurrentThemeIcon(): string {
        const theme = this.themes.find(t => t.id === this.currentTheme);
        return theme ? theme.icon : 'circle';
    }

    getCurrentThemeName(): string {
        const theme = this.themes.find(t => t.id === this.currentTheme);
        return theme ? this.translate(theme.translateKey) : this.translate('theme');
    }

    translate(key: string): string {
        return this.languageService.translate(key);
    }
}
