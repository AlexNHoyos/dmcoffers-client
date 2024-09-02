import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from '../../services/auth/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  userLoginOn: boolean = false;
  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe({
      next: (userLoginOn) => {
        this.userLoginOn = userLoginOn;
      },
    });
  }

  home() {
    this.router.navigate(['/inicio']);
  }

  login() {
    this.router.navigate(['/iniciar-sesion']);
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/inicio']);
  }
}
