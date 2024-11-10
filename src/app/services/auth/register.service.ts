import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "src/app/auth/auth.models";
import { environment } from "src/environments/environment";

@Injectable()
export class RegisterService {

    constructor(
        private http: HttpClient
    ) {

    }

    register(user: User): Observable<any> {
        console.log("entra");
        return this.http.post<any>(`${environment.urlHost}users/register`, user);
    }

}