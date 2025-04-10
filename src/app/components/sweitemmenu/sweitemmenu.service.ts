import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { MenuItem, SweItemMenuPage } from "./sweitemmenu.models";
import { CrudService } from "../crud/crud.service";


@Injectable({
    providedIn: 'root',
})
export class SweItemMenuService extends CrudService<SweItemMenuPage> {
    override endpoint = `${environment.urlApi}sweItemMenu`;

    constructor(protected override http: HttpClient) {
        super(http);
    }

    getMenuItem(): Observable<MenuItem[]> {
        return this.http.get<MenuItem[]>(this.endpoint + '/findall');
    }
}
