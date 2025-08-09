import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly themeKey = 'theme';

  constructor() {
    this.loadTheme(); // al instanciar el servicio
  }

  toggleTheme(): void {
    const body = document.body;
    const isLight = body.classList.contains('light-theme');

    const newTheme = isLight ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  setTheme(theme: 'light' | 'dark'): void {
    const body = document.body;
    body.classList.remove('light-theme', 'dark-theme');
    body.classList.add(`${theme}-theme`);
    localStorage.setItem(this.themeKey, theme); // guardar
  }

  loadTheme(): void {
    const savedTheme = localStorage.getItem(this.themeKey) as 'light' | 'dark';
    const theme = savedTheme || 'light'; // por defecto light
    this.setTheme(theme);
  }
}
