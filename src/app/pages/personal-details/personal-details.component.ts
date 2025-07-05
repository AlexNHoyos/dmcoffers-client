import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user/user.service';
import { LoginService } from 'src/app/services/auth/login.service';
import { FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProximamenteService } from 'src/app/services/proximamente.service';

@Component({
    selector: 'app-personal-details',
    templateUrl: './personal-details.component.html',
    styleUrls: ['./personal-details.component.scss'],
    providers: [DatePipe],
    standalone: false
})
export class PersonalDetailsComponent implements OnInit {
  errorMessage: String = '';
  userId: number | null = null;
  user?: User;
  userLoginOn: boolean = false;
  editMode: boolean = false;
  userRol: string | null = null;
  private subscriptions: Subscription = new Subscription();

  registerForm = this.formBuilder.group({
    id: [''],
    surname: ['', Validators.required],
    realname: ['', Validators.required],
  });

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private proximamenteService: ProximamenteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obtener el userId desde UserService
    this.userService.getUserId().subscribe((id) => {
      this.userId = id;
      if (this.userId) {
        this.loadUserData(this.userId);
      }
    });

    // Suscribirse al estado de userLoginOn
    this.loginService.userLoginOn.subscribe({
      next: (userLoginOn) => {
        this.userLoginOn = userLoginOn;
        if (!this.userLoginOn) {
          this.router.navigate(['/inicio']); // Redirige a la página de inicio si no está logueado
        }
      },
    });
  }

  loadUserData(userId: number) {
    // Reemplaza environment.userId con this.userId
    this.userService.getUser(userId).subscribe({
      next: (userData) => {
        console.log(userData);
        this.user = userData;
        this.registerForm.controls.id.setValue(
          userData.idUser.toString() ?? ''
        );
        this.registerForm.controls.realname.setValue(userData.realname ?? '');
        this.registerForm.controls.surname.setValue(userData.surname ?? '');
        this.loadUserRol();
      },
      error: (errorData) => {
        this.errorMessage = errorData;
      },
      complete: () => {
        console.info('User Data ok');
      },
    });
  }

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

  goToWishlist(): void {
    this.router.navigate(['/wishlist']);
  }

  showProximamente(): void {
    this.proximamenteService.mostrarMensaje();
  }

  get realname() {
    return this.registerForm.controls.realname;
  }

  get surname() {
    return this.registerForm.controls.surname;
  }

  savePersonalDetailsData() {
    if (this.registerForm.valid && this.userId) {
      this.userService
        .updateUser(this.userId, this.registerForm.value as unknown as User)
        .subscribe({
          next: () => {
            this.editMode = false;
            this.user = this.registerForm.value as unknown as User;
            location.reload();
          },
          error: (errorData) => console.error(errorData),
        });
    }
  }
}
