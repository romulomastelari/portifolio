export interface GitHubRepo {
    id: number;
    name: string;
    description: string;
    html_url: string;
    homepage: string;
    stargazers_count: number;
    language: string;
    topics: string[];
}
