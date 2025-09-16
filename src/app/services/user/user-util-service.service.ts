import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class UserUtilsService {
  constructor(private userService: UserService) { }

  setLoggedInUser(): Observable<string | null> {
    return this.userService.getUserId().pipe(
      switchMap((userId) => {
        if (userId != null) {
          return this.userService
            .getUser(userId)
            .pipe(map((user) => user.username));
        } else {
          return of(null);
        }
      })
    );
  }
}
