import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { MenuItem } from "./models/sweitemmenu.models";


@Injectable({
    providedIn: 'root',
})
export class SweItemMenuService {
    private apiUrl: string = environment.urlApi;

    constructor(private http: HttpClient) { }

    getMenuItem(): Observable<MenuItem[]> {
        return this.http.get<MenuItem[]>(`{this.apiUrl}`);
    }
}
