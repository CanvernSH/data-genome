import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Service - Call backend using Angular's HttpClient and using observables returing its type 
// (Automatic json parsing, easier retesting etc)
@Injectable({
    providedIn: 'root'
})
export class LoadDataService {
    constructor(private http: HttpClient) {}

    loadData(): Observable<number[]> {
        return this.http.get<number[]>('http://localhost:3000/collect-genome-data');
    }
}