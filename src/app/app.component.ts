import { Component, OnInit } from '@angular/core';
import { Publisher } from './aplicacion/publishers/publisher.model';
import { Subscription } from 'rxjs';
import { LoginService } from './services/auth/login.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent implements OnInit {
  publishers: Publisher[] = [];
  title = 'dmcoffers-client';
  userLoginOn: boolean = false;
  private subscription: Subscription = new Subscription();

  constructor(private loginService: LoginService) { }

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
