import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type Theme = 'light-green' | 'light-blue' | 'light-red' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private renderer: Renderer2;
  private currentThemeSubject = new BehaviorSubject<Theme>('light-green');

  currentTheme$: Observable<Theme> = this.currentThemeSubject.asObservable();
  
  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);

    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme && this.isValidTheme(savedTheme)) {
      this.setTheme(savedTheme);
    } else {
      this.setTheme('light-green');
    }
  }
  
  setTheme(theme: Theme): void {
    if (!this.isValidTheme(theme)) {
      console.error(`Theme "${theme}" is not valid`);
      return;
    }
    
    const body = document.body;
    body.classList.remove('light-green', 'light-blue', 'light-red', 'dark');
    body.classList.add(theme);
    localStorage.setItem('theme', theme);
    this.currentThemeSubject.next(theme);
  }
  
  private isValidTheme(theme: string): theme is Theme {
    return ['light-green', 'light-blue', 'light-red', 'dark'].includes(theme);
  }
}
