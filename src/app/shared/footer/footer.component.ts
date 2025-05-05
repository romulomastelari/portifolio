import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { ThemeService, Theme } from '../../services/theme.service';
import { Subscription } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {faLinkedin, faGithub, faTwitter, faWhatsapp, faInstagram} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, OnDestroy {
  currentYear = new Date().getFullYear();
  currentTheme: Theme = 'light-green';
  private themeSubscription: Subscription | undefined;

  navLinks = [
    { path: '/about', label: 'about' },
    { path: '/projects', label: 'projects' },
    { path: '/contact', label: 'contact' }
  ];

  socialLinks = [
    { url: 'https://linkedin.com/in/romulo-mastelari/', icon: faLinkedin, label: 'LinkedIn' },
    { url: 'https://github.com/romulomastelari', icon: faGithub, label: 'GitHub' },
    { url: 'https://www.instagram.com/romulomastelari', icon: faInstagram, label: 'Instagram' },
    { url: 'https://api.whatsapp.com/send/?phone=5514996571886&text=Ol%C3%A1%2C+como+vai%3F%0APodemos+conversar+um+pouco...&type=phone_number&app_absent=0', icon: faWhatsapp, label: 'Whatsapp' }
  ];

  authorName = 'Rômulo Mastelari';

  constructor(
    private languageService: LanguageService,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.themeSubscription = this.themeService.currentTheme$.subscribe(theme => {
      this.currentTheme = theme;
    });
  }

  ngOnDestroy(): void {
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }

  translate(key: string): string {
    return this.languageService.translate(key);
  }
}
