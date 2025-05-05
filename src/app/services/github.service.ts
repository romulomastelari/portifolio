import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, catchError, of} from 'rxjs';
import {GitHubUser} from '../models/interfaces/git/githubuser';

@Injectable({
    providedIn: 'root'
})
export class GitHubService {
    private readonly apiUrl = 'https://api.github.com/users/romulomastelari';

    constructor(private http: HttpClient) {
    }

    getUserProfile(): Observable<GitHubUser> {
        return this.http.get<GitHubUser>(this.apiUrl).pipe(
            catchError(error => {
                console.error('Error fetching GitHub user profile', error);
                return of({} as GitHubUser);
            })
        );
    }
}
