import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { LoginService } from './services/auth/login.service';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'dmcoffers-client';
  isLoading$: Observable<boolean>;
  userLoginOn: boolean = false;
  private subscription: Subscription = new Subscription();

  constructor(private loginService: LoginService, 
              private loadingService: LoadingService) {  

                this.isLoading$ = this.loadingService.loading$;
    }


  ngOnInit(): void {
    this.subscription.add(
      this.loginService.userLoginOn.subscribe({
        next: (userLoginOn) => {
          this.userLoginOn = userLoginOn;
        },
        error: (err) => {
          console.error('Error al suscribirse al estado de login', err);
        },
      })
    );
  }
}
