import {Component, HostListener, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {ThemeSwitcherComponent} from '../theme-switcher/theme-switcher.component';
import {LanguageSwitcherComponent} from '../language-switcher/language-switcher.component';
import {LogoComponent} from '../logo/logo.component';
import {GitHubService} from '../../services/github.service';
import {LanguageService} from '../../services/language.service';
import {GitHubUser} from "../../models/interfaces/git/githubuser";
import {faGithub, faInstagram, faLinkedin, faWhatsapp} from '@fortawesome/free-brands-svg-icons';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {FaIconLibrary} from "@fortawesome/angular-fontawesome";

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule, RouterLink, RouterLinkActive, ThemeSwitcherComponent, LanguageSwitcherComponent, LogoComponent, FontAwesomeModule],
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    isMenuOpen = false;
    isMobileView = false;
    userProfile: GitHubUser | null = null;
    loading = true;
    isSocialMenuOpen = false;

    socialLinks = [
        {name: 'GitHub', url: 'https://github.com/romulomastelari', icon: faGithub},
        {name: 'LinkedIn', url: 'https://www.linkedin.com/in/romulo-mastelari/', icon: faLinkedin},
        {name: 'Instagram', url: 'https://www.instagram.com/romulomastelari', icon: faInstagram},
        {
            name: 'Whatsapp',
            url: 'https://api.whatsapp.com/send/?phone=5514996571886&text=Ol%C3%A1%2C+como+vai%3F%0APodemos+conversar+um+pouco...&type=phone_number&app_absent=0',
            icon: faWhatsapp
        }
    ];

    faTimes = faTimes;

    constructor(
        private githubService: GitHubService,
        private languageService: LanguageService,
        private library: FaIconLibrary
    ) {
        this.checkScreenSize();
        this.library.addIcons(faTimes);
    }

    @HostListener('document:click', ['$event'])
    onDocumentClick(event: Event): void {
        const target = event.target as HTMLElement;
        if (!target.closest('.social-dropdown')) {
            this.isSocialMenuOpen = false;
        }
    }

    @HostListener('document:wheel', ['$event'])
    onDocumentScroll(event: Event): void {
        this.isSocialMenuOpen = false;
    }

    ngOnInit(): void {
        this.loadUserProfile();
    }

    private loadUserProfile(): void {
        this.githubService.getUserProfile().subscribe({
            next: (profile) => {
                this.userProfile = profile;
                this.loading = false;
            },
            error: () => {
                this.loading = false;
            }
        });
    }

    @HostListener('window:resize', ['$event'])
    onResize() {
        this.checkScreenSize();
    }

    private checkScreenSize() {
        this.isMobileView = window.innerWidth < 768;
        if (!this.isMobileView) {
            this.isMenuOpen = false;
        }
    }

    toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
    }

    closeMenu() {
        if (this.isMobileView) {
            this.isMenuOpen = false;
        }
    }

    toggleSocialMenu() {
        this.isSocialMenuOpen = !this.isSocialMenuOpen;
    }

    closeSocialMenu() {
        this.isSocialMenuOpen = false;
    }

    translate(key: string): string {
        return this.languageService.translate(key);
    }
}
