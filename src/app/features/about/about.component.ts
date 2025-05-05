import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GitHubService} from '../../services/github.service';
import {LanguageService} from '../../services/language.service';
import {GitHubUser} from "../../models/interfaces/git/githubuser";

@Component({
    selector: 'app-about',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
    skills: string[] = [
        'Angular',
        'TypeScript',
        'DevExtreme',
        'HTML5',
        'CSS3/SCSS',
        'JavaScript',
        'Responsive Design',
        'Git',
        'RESTful APIs'
    ];

    softSkills: string[] = [
        'comunicationTag',
        'teamworkTag',
        'problemSolvingTag',
        'apadtabilityTag',
        'productivityTag'
    ];

    userProfile: GitHubUser | null = null;
    loading = true;

    constructor(
        private githubService: GitHubService,
        private languageService: LanguageService
    ) {
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

    translate(key: string): string {
        return this.languageService.translate(key);
    }
}
