import {Component, OnInit, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GitHubService} from '../../services/github.service';
import {LanguageService} from '../../services/language.service';
import {GitHubUser} from "../../models/interfaces/git/githubuser";
import {Skill} from "../../models/interfaces/about/skill";
import {Recommendation} from "../../models/interfaces/about/recommendation";
import {Certification} from "../../models/interfaces/about/certification";
import {PersonalInterest} from "../../models/interfaces/about/personal-interest";
import {ImpactMetric} from "../../models/interfaces/about/impact-metric";
import {CareerExperience} from "../../models/interfaces/about/career-experience";
import {faAngular, faCss3Alt, faDocker, faGitAlt, faHtml5, faJs, faLinkedin} from '@fortawesome/free-brands-svg-icons';
import {
    faCalendarDays,
    faCertificate,
    faChartLine,
    faChevronLeft,
    faChevronRight,
    faChildren,
    faCode,
    faComments,
    faFish,
    faGamepad,
    faMobile,
    faMotorcycle,
    faPeopleGroup,
    faProjectDiagram,
    faPuzzlePiece,
    faQuoteLeft,
    faQuoteRight,
    faServer,
    faShuffle,
    faUsers
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {TranslatePipe} from "../../pipes/translate.pipe";
import {TagWithPopoverComponent} from "../../shared/tag-with-popover/tag-with-popover.component";
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
    selector: 'app-about',
    standalone: true,
    imports: [CommonModule, TranslatePipe, TagWithPopoverComponent, FontAwesomeModule],
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss'],
    animations: [
        trigger('fadeIn', [
            transition(':enter', [
                style({opacity: 0, transform: 'translateY(20px)'}),
                animate('0.5s ease-out', style({opacity: 1, transform: 'translateY(0)'}))
            ])
        ]),
        trigger('slideIn', [
            transition(':enter', [
                style({opacity: 0, transform: 'translateX(-30px)'}),
                animate('0.5s ease-out', style({opacity: 1, transform: 'translateX(0)'}))
            ])
        ]),
        trigger('cardAnimation', [
            transition(':enter', [
                style({opacity: 0, transform: 'scale(0.9)'}),
                animate('0.4s ease-out', style({opacity: 1, transform: 'scale(1)'}))
            ])
        ])
    ]
})
export class AboutComponent implements OnInit {
    protected faQuoteLeft = faQuoteLeft;
    protected faQuoteRight = faQuoteRight;
    protected faLinkedin = faLinkedin;
    protected faChevronLeft = faChevronLeft;
    protected faChevronRight = faChevronRight;
    protected faCertificate = faCertificate;
    protected faBriefcase = faCode;
    protected faCalendar = faCalendarDays;

    professionalSummary = "Desenvolvedor Front-end com experiência sólida em Angular, Typescript, DevExtreme, Tailwind e sistemas corporativos de grande porte, atuando em projetos internos. Forte atuação em times ágeis, entrega de soluções robustas, escaláveis e de alta performance. Experiência com CI/CD, testes automatizados, integração com APIs RESTful, arquitetura moderna e cultura DevOps.";

    skills: Skill[] = [
        {name: 'Angular', icon: faAngular, proficiency: 95, level: 'advanced'},
        {name: 'TypeScript', icon: faJs, proficiency: 90, level: 'advanced'},
        {name: 'DevExtreme', icon: faCode, proficiency: 90, level: 'advanced'},
        {name: 'HTML5', icon: faHtml5, proficiency: 90, level: 'advanced'},
        {name: 'CSS3/SCSS', icon: faCss3Alt, proficiency: 90, level: 'advanced'},
        {name: 'JavaScript', icon: faJs, proficiency: 90, level: 'advanced'},
        {name: 'Docker', icon: faDocker, proficiency: 90, level: 'advanced'},
        {name: 'Responsive Design', icon: faMobile, proficiency: 80, level: 'advanced'},
        {name: 'Git', icon: faGitAlt, proficiency: 95, level: 'advanced'},
        {name: 'RESTful APIs', icon: faServer, proficiency: 80, level: 'intermediate'}
    ];

    softSkills: Skill[] = [
        {name: 'comunicationTag', icon: faComments, proficiency: 90, level: 'advanced'},
        {name: 'teamworkTag', icon: faPeopleGroup, proficiency: 90, level: 'advanced'},
        {name: 'problemSolvingTag', icon: faPuzzlePiece, proficiency: 90, level: 'advanced'},
        {name: 'apadtabilityTag', icon: faShuffle, proficiency: 90, level: 'advanced'},
        {name: 'productivityTag', icon: faChartLine, proficiency: 90, level: 'advanced'}
    ];

    recommendations: Recommendation[] = [
        {
            name: 'Kevin Lopes',
            title: 'Software Developer | Fullstack | Angular | NodeJs | C#',
            date: '14 de março de 2025',
            relationship: 'Kevin trabalhava com Romulo na mesma equipe',
            text: 'Tive o prazer de trabalhar com o Rômulo na SERVIMED e posso dizer com certeza que ele é um dos desenvolvedores front-end mais talentosos com quem já colaborei. Seu domínio do Angular é impressionante, e ele sempre busca as melhores práticas para garantir código limpo, performático e escalável. Além do conhecimento técnico, Rômulo se destaca pela capacidade de resolver problemas complexos e de colaborar com o time de forma proativa. Sempre disposto a ajudar e compartilhar conhecimento, ele eleva o nível do time e contribui para um ambiente de trabalho produtivo e motivador. Se você procura um profissional altamente qualificado, comprometido e apaixonado pelo que faz, Rômulo é, sem dúvida, uma excelente escolha!'
        },
        {
            name: 'Bruno William Robles Franco',
            title: 'Desenvolvedor Front-end | JavaScript | TypeScript | Angular',
            date: '21 de maio de 2024',
            relationship: 'Bruno trabalhava com Romulo na mesma equipe',
            text: 'Ao trabalhar com o Romulo, notei uma consistência de competência técnica, criatividade e dedicação, sendo um profissional muito talentoso. Tivemos várias experiências juntos onde aprendi muito com ele. Foram postas a prova habilidades de comunicação, resolução de problemas e criatividade, das quais ele mostrou excelência e dedicação a todo momento. Recomendo-o com muito orgulho para todas as vagas, ainda mais para as de Desenvolvimento de Front-end.'
        },
        {
            name: 'Gustavo Santos',
            title: 'Data Analyst | SQL e Python | Desenvolvimento em Java e Automação',
            date: '10 de maio de 2024',
            relationship: 'Gustavo trabalhava com Romulo mas em equipes diferentes',
            text: 'É um prazer recomendar Romulo como um excelente profissional. Tive o privilégio de colaborar com ele na Viewb Analytics, onde pude testemunhar sua habilidade exemplar como desenvolvedor front-end. Romulo não só demonstra uma vasta experiência na área, mas também se empenha incansavelmente para garantir a satisfação do cliente e promover inovação tecnológica. Ele se destaca especialmente em HTML, CSS e JavaScript, aplicando essas habilidades com maestria para criar interfaces de usuário intuitivas e atraentes. Além disso, Romulo é conhecido por sua disposição em ajudar a equipe com novas ideias e por cultivar um ambiente de trabalho tranquilo e produtivo. Sua dedicação ao aprendizado contínuo e sua capacidade de agregar valor à empresa são verdadeiramente impressionantes. Não hesito em recomendar Romulo como um ativo valioso para qualquer equipe ou projeto.'
        }
    ];

    personalInterests: PersonalInterest[] = [
        {
            name: 'Gamer',
            icon: faGamepad,
            description: 'Gosto muito de todo tipo de tecnologia e Jogos Online'
        },
        {
            name: 'Motos',
            icon: faMotorcycle,
            description: 'Gosto muito de motos e velocidade'
        },
        {
            name: 'Pescaria',
            icon: faFish,
            description: 'Amoooo pescar e aprecio a natureza'
        },
        {
            name: 'Família',
            icon: faChildren,
            description: 'Família em primeiro lugar: amo sair com minha esposa e filha'
        }
    ];

    impactMetrics: ImpactMetric[] = [
        {
            label: 'Anos de experiência em Front-End',
            value: 4,
            icon: faCalendarDays,
            suffix: '+'
        },
        {
            label: 'Projetos entregues',
            value: 10,
            icon: faProjectDiagram,
            suffix: '+'
        },
        {
            label: 'Usuários impactados',
            value: '1000',
            icon: faUsers,
            suffix: '+'
        }
    ];

    certifications: Certification[] = [
        {
            title: 'Angular e RxJS: programação reativa',
            issuer: 'Alura',
            date: 'mar de 2022',
            credentialId: '0a157765-5a78-4294-9861-8efc93763e3e',
            url: 'https://cursos.alura.com.br/certificate/0a157765-5a78-4294-9861-8efc93763e3e?lang',
        },
        {
            title: 'Angular: controle o fluxo de navegação',
            issuer: 'Alura',
            date: 'mar de 2022',
            credentialId: '0b896f90-debc-448c-8bbc-6aa2333abd7a',
            url: 'https://cursos.alura.com.br/certificate/0b896f90-debc-448c-8bbc-6aa2333abd7a?lang'
        },
        {
            title: 'Angular: boas práticas em arquiteturas e formulários',
            issuer: 'Alura',
            date: 'fev de 2022',
            credentialId: 'e4fecd4d-7178-4995-928d-279d2848840f',
            url: 'https://cursos.alura.com.br/certificate/e4fecd4d-7178-4995-928d-279d2848840f?lang'
        }
    ];

    protected currentRecommendationIndex = signal(0);

    careerExperiences: CareerExperience[] = [
        {
            period: 'Jan 2025 – Atual',
            company: 'Servimed',
            role: 'Analista de sistema',
            description: [
                'Liderança em migração Angular 5 → Angular 17',
                'Kanban, automações, performance, DataGrid, integrações rápidas PDF/XML',
                'Padrão de código, escalabilidade, ajuda para equipe'
            ]
        },
        {
            period: 'Out 2021 – Jan 2025',
            company: 'ViewB',
            role: 'Desenvolvedor Front-End',
            description: [
                'Angular avançado, Typescript, DevExtreme, Material Design',
                'Docker, CI/CD, GitHub',
                'Criação de novas features, correção de bugs, melhorias de performance',
            ]
        },
        {
            period: 'Abr 2021 – Out 2021',
            company: 'Itatec',
            role: 'Client Support Analyst',
            description: [
                'Atendimento, suporte técnico, automação de processos',
                'Diagnósticos, plataforma de chamados'
            ]
        },
        {
            period: 'Jan 2014 – Jan 2021',
            company: 'Autônomo',
            role: 'Técnico em manutenção de computadores',
            description: [
                'Instalação, configuração, backup',
                'Suporte a clientes'
            ]
        }
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

    nextRecommendation(): void {
        if (this.currentRecommendationIndex() < this.recommendations.length - 1) {
            this.currentRecommendationIndex.set(this.currentRecommendationIndex() + 1);
        } else {
            this.currentRecommendationIndex.set(0);
        }
    }

    previousRecommendation(): void {
        if (this.currentRecommendationIndex() > 0) {
            this.currentRecommendationIndex.set(this.currentRecommendationIndex() - 1);
        } else {
            this.currentRecommendationIndex.set(this.recommendations.length - 1);
        }
    }

    getCurrentRecommendation(): Recommendation {
        return this.recommendations[this.currentRecommendationIndex()];
    }
}
