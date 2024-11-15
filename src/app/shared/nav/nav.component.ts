import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from '../../services/auth/login.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserUtilsService } from 'src/app/services/user/user-util-service.service';
import { ProximamenteService } from 'src/app/services/proximamente.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit, OnDestroy {
  searchTerm: string = '';
  userLoginOn: boolean = false;
  username: string | null = null;
  userRol: string | null = null;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private loginService: LoginService,
    private userUtilsService: UserUtilsService,
    private router: Router,
    private proximamenteService: ProximamenteService
  ) {}

  menuOpen: boolean = false; // Estado inicial cerrado

  toggleMenu() {
    this.menuOpen = !this.menuOpen; // Cambia el estado
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.loginService.userLoginOn.subscribe({
        next: (userLoginOn) => {
          this.userLoginOn = userLoginOn;
          if (userLoginOn) {
            this.loadUsername();
            this.loadUserRol();
          } else {
            this.username = null;
            this.userRol = null;
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

  showProximamente(): void {
    this.proximamenteService.mostrarMensaje();
  }

  // Método para cargar el nombre del usuario
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

  // Método para cargar el rol del usuario
  loadUserRol(): void {
    this.subscriptions.add(
      this.loginService.userRol.subscribe({
        next: (role) => {
          this.userRol = role; // Asigna el rol
        },
        error: (err) => {
          console.error('Error al obtener el rol del usuario', err);
        },
      })
    );
  }

  dashboard() {
    this.router.navigate(['/dashboard']);
  }

  login() {
    this.router.navigate(['/login']);
  }

  register() {
    this.router.navigate(['/register']);
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/inicio']);
    window.location.reload();
  }

  info() {
    this.router.navigate(['/info']);
  }

  wishlist() {
    this.router.navigate(['/wishlist']);
  }

  soporte() {
    this.router.navigate(['/soporte']);
  }

  onSearch() {
    if (this.searchTerm.trim()) {
      this.router.navigate(['/resultados'], {
        queryParams: { param: this.searchTerm },
      });
    }
  }
}
