import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class DataAnalyzerService {
    constructor(private http: HttpClient) { }

    getData(url: string, payload: any): Observable<any> {
        return this.http.post(url, payload);
    }
}