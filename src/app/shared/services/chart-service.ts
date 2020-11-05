import { Injectable } from "@angular/core";
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class ChartService {

    apiUrl: string = 'https://run.mocky.io/v3';
    //headers = new HttpHeaders().set('Content-Type', 'application/json');

    constructor(private http: HttpClient) { }

    getLineChartData() {
        return this.http.get(`${this.apiUrl}` + "/3e9ec43b-6da7-498b-a233-3bff1d248c3e");
    }

    getStackedChartData() {
        return this.http.get(`${this.apiUrl}` + "/6e946712-59d1-481f-9124-d2f2ec1cd5cd");
    }

    getMicroChartData() {
        return this.http.get(`${this.apiUrl}` + "/6430da22-228a-4568-a681-2ea4e581fbc1");
    }

    getTimeChartData() {
        return this.http.get(`${this.apiUrl}` + "/45d0da80-1bd4-488b-851e-090fe801ee37");
    }

    // Handle Errors 
    /* error(error: HttpErrorResponse) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            errorMessage = error.error.message;
        } else {
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.log(errorMessage);
        return throwError(errorMessage);
    } */
}
