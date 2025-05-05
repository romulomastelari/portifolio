import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'about',
    pathMatch: 'full'
  },
  {
    path: 'about',
    loadComponent: () => import('./features/about/about.component').then(m => m.AboutComponent),
    title: 'Rômulo Mastelari - About',
    data: {
      description: 'Conheça um pouco sobre mim, Rômulo Mastelari, desenvolvedor front-end especializado em Angular, TypeScript e JS..',
      image: 'assets/about-og.jpg'
    }
  },
  {
    path: 'projects',
    loadComponent: () => import('./features/projects/projects.component').then(m => m.ProjectsComponent),
    title: 'Rômulo Mastelari - Projects',
    data: {
      description: 'Explore projetos desenvolvidos por Rômulo Mastelari, demonstrando habilidades em Angular, TypeScript e desenvolvimento web em geral',
      image: 'assets/projects-og.jpg'
    }
  },
  {
    path: 'contact',
    loadComponent: () => import('./features/contact/contact.component').then(m => m.ContactComponent),
    title: 'Rômulo Mastelari - Contact',
    data: {
      description: 'Entre em contato comigo Rômulo Mastelari para consultas sobre projetos, colaborações ou apenas para dizer olá.',
      image: 'assets/contact-og.jpg'
    }
  },
  {
    path: '**',
    redirectTo: 'about'
  }
];
