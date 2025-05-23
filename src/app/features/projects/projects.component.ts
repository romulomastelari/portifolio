import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ProjectsService} from './projects.service';
import {GitHubRepo} from "../../models/interfaces/git/githubrepo";
import {TranslatePipe} from "../../pipes/translate.pipe";

@Component({
    selector: 'app-projects',
    standalone: true,
    imports: [CommonModule, FormsModule, TranslatePipe],
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit, AfterViewInit, OnDestroy {
    allProjects: GitHubRepo[] = [];
    projects: GitHubRepo[] = [];
    loading = true;
    error = false;

    searchTerm = '';
    selectedLanguage = '';
    languages: string[] = [];
    private searchDebounce: any;

    @ViewChildren('projectCard') projectCards!: QueryList<ElementRef>;
    private observer: IntersectionObserver | null = null;

    constructor(private projectsService: ProjectsService) {
    }

    ngOnInit(): void {
        this.loadProjects();
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.setupIntersectionObserver();
        }, 500);
    }

    ngOnDestroy(): void {
        if (this.observer) {
            this.observer.disconnect();
        }
    }

    private setupIntersectionObserver(): void {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    this.observer?.unobserve(entry.target);
                }
            });
        }, options);

        if (this.projectCards) {
            this.projectCards.forEach(card => {
                this.observer?.observe(card.nativeElement);
            });
        }
    }

    loadProjects(): void {
        this.loading = true;
        this.error = false;

        this.projectsService.getProjects().subscribe({
            next: (repos) => {
                this.allProjects = repos;
                this.extractLanguages();
                this.filterProjects();
                this.loading = false;
            },
            error: () => {
                this.error = true;
                this.loading = false;
            }
        });
    }

    retryLoading(): void {
        this.loadProjects();
    }

    getLanguageClass(language: string | null): string {
        if (!language) return 'language-unknown';

        return 'language-' + language.toLowerCase().replace(/\s+/g, '-');
    }

    private extractLanguages(): void {
        const languagesSet = new Set<string>();

        this.allProjects.forEach(project => {
            if (project.language) {
                languagesSet.add(project.language);
            }
        });

        this.languages = Array.from(languagesSet).sort();
    }

    filterProjects(): void {
        if (this.observer) {
            this.observer.disconnect();
        }

        let filtered = this.allProjects;

        if (this.selectedLanguage) {
            filtered = filtered.filter(project =>
                project.language === this.selectedLanguage
            );
        }

        if (this.searchTerm.trim()) {
            const term = this.searchTerm.toLowerCase().trim();
            filtered = filtered.filter(project =>
                project.name.toLowerCase().includes(term) ||
                (project.description && project.description.toLowerCase().includes(term))
            );
        }

        this.projects = filtered;

        setTimeout(() => {
            this.setupIntersectionObserver();
        }, 100);
    }

    onSearch(): void {
        if (this.searchDebounce) {
            clearTimeout(this.searchDebounce);
        }
        this.searchDebounce = setTimeout(() => {
            this.filterProjects();
        }, 300);
    }

    onLanguageChange(): void {
        this.filterProjects();
    }

    clearFilters(): void {
        this.searchTerm = '';
        this.selectedLanguage = '';
        this.filterProjects();
    }
}
