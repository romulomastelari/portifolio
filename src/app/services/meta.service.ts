import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MetaService {
  private defaultTitle = 'Rômulo Mastelari - Front-End Developer';
  private defaultDescription = 'Portfolio of Rômulo Mastelari, Front-End Developer specializing in Angular, TypeScript and DevExtreme';
  private defaultImage = 'assets/og-image.jpg';

  constructor(
    private meta: Meta,
    private title: Title,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  init() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const route = this.getActiveRoute(this.activatedRoute);
      const routeTitle = route.snapshot.data['title'];
      const routeDescription = route.snapshot.data['description'];
      const routeImage = route.snapshot.data['image'];

      this.updateMetaTags({
        title: routeTitle || this.defaultTitle,
        description: routeDescription || this.defaultDescription,
        image: routeImage || this.defaultImage,
        url: this.router.url
      });
    });
  }

  private getActiveRoute(route: ActivatedRoute): ActivatedRoute {
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route;
  }

  updateMetaTags({ title, description, image, url }: { 
    title: string, 
    description: string, 
    image: string, 
    url: string 
  }) {
    this.title.setTitle(title);

    const tags = [
      { name: 'description', content: description },
      { name: 'og:title', content: title },
      { name: 'og:description', content: description },
      { name: 'og:image', content: image },
      { name: 'og:url', content: `https://romulomastelari.com${url}` },
      { name: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image }
    ];

    tags.forEach(tag => {
      this.meta.updateTag({ name: tag.name, content: tag.content });
    });
  }
}
