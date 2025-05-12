import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GitHubService} from '../../services/github.service';
import {LanguageService} from '../../services/language.service';
import {GitHubUser} from "../../models/interfaces/git/githubuser";
import {Skill} from "../../models/interfaces/about/skill";
import {
    faAngular,
    faJs,
    faHtml5,
    faCss3Alt,
    faGitAlt, faDocker
} from '@fortawesome/free-brands-svg-icons';
import {
    faChartLine,
    faCode, faComments,
    faMobile, faPeopleGroup, faPuzzlePiece,
    faServer, faShuffle
} from '@fortawesome/free-solid-svg-icons';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {TranslatePipe} from "../../pipes/translate.pipe";
import {MatTooltip} from "@angular/material/tooltip";
import {TagWithPopoverComponent} from "../../shared/tag-with-popover/tag-with-popover.component";

@Component({
    selector: 'app-about',
    standalone: true,
    imports: [CommonModule, TranslatePipe, TagWithPopoverComponent],
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
    skills: Skill[] = [
        { name: 'Angular', icon: faAngular, proficiency: 95, level: 'advanced' },
        { name: 'TypeScript', icon: faJs, proficiency: 90, level: 'advanced'},
        { name: 'DevExtreme', icon: faCode, proficiency: 90, level: 'advanced' },
        { name: 'HTML5', icon: faHtml5, proficiency: 90, level: 'advanced' },
        { name: 'CSS3/SCSS', icon: faCss3Alt, proficiency: 90, level: 'advanced' },
        { name: 'JavaScript', icon: faJs, proficiency: 90, level: 'advanced' },
        { name: 'Docker', icon: faDocker, proficiency: 90, level: 'advanced' },
        { name: 'Responsive Design', icon: faMobile, proficiency: 80, level: 'advanced' },
        { name: 'Git', icon: faGitAlt, proficiency: 95, level: 'advanced' },
        { name: 'RESTful APIs', icon: faServer, proficiency: 80, level: 'intermediate' }
    ];

    softSkills: Skill[] = [
        { name: 'comunicationTag', icon: faComments, proficiency: 90, level: 'advanced' },
        { name: 'teamworkTag', icon: faPeopleGroup, proficiency: 90, level: 'advanced' },
        { name: 'problemSolvingTag', icon: faPuzzlePiece, proficiency: 90, level: 'advanced' },
        { name: 'apadtabilityTag', icon: faShuffle, proficiency: 90, level: 'advanced' },
        { name: 'productivityTag', icon: faChartLine,proficiency: 90, level: 'advanced' }
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
