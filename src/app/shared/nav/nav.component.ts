import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from '../../services/auth/login.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserUtilsService } from 'src/app/services/user/user-util-service.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit, OnDestroy {
  userLoginOn: boolean = false;
  username: string | null = null;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private loginService: LoginService,
    private userUtilsService: UserUtilsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.loginService.userLoginOn.subscribe({
        next: (userLoginOn) => {
          this.userLoginOn = userLoginOn;
          if (userLoginOn) {
            this.loadUsername();
          } else {
            this.username = null;
          }
        },
        error: (err) => {
          console.error('Error al suscribirse al estado de login', err);
        },
      })
    );
  }

  ngOnDestroy(): void {
    // Limpiar la suscripción para evitar fugas de memoria
    this.subscriptions.unsubscribe();
  }

  private loadUsername(): void {
    this.subscriptions.add(
      this.userUtilsService.setLoggedInUser().subscribe({
        next: (username) => {
          this.username = username;
        },
        error: (err) => {
          console.error('Error al obtener el nombre de usuario', err);
        },
      })
    );
  }

  home() {
    this.router.navigate(['/inicio']);
  }

  login() {
    this.router.navigate(['/login']);
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/inicio']);
  }

  info() {
    this.router.navigate(['/info']);
  }
}
