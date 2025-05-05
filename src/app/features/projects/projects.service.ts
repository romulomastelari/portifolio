import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { GitHubRepo } from '../../models/interfaces/git/githubrepo';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private readonly apiUrl = 'https://api.github.com/users/romulomastelari/repos';
  
  constructor(private http: HttpClient) {}
  
  getProjects(): Observable<GitHubRepo[]> {
    return this.http.get<GitHubRepo[]>(this.apiUrl).pipe(
      map(repos => 
        repos
          .filter(repo => !repo.name.includes('.github.io'))
          .sort((a, b) => b.stargazers_count - a.stargazers_count)
      ),
      catchError(error => {
        console.error('Error fetching GitHub repositories', error);
        return of([]);
      })
    );
  }
}
