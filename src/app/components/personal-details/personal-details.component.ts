import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user/user.service';
import { environment } from 'src/environments/environment';
import { LoginService } from 'src/app/services/auth/login.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.scss'],
})
export class PersonalDetailsComponent implements OnInit {
  errorMessage: String = '';
  userId: string | null = '';
  user?: User;
  userLoginOn: boolean = false;
  editMode: boolean = false;

  registerForm = this.formBuilder.group({
    id: [''],
    surname: ['', Validators.required],
    realname: ['', Validators.required],
  });

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private loginService: LoginService
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
      },
    });
  }

  loadUserData(userId: string) {
    // Reemplaza environment.userId con this.userId
    this.userService.getUser(userId).subscribe({
      next: (userData) => {
        console.log(userData);
        this.user = userData;
        this.registerForm.controls.id.setValue(userData.id);
        this.registerForm.controls.realname.setValue(userData.realname);
        this.registerForm.controls.surname.setValue(userData.surname);
      },
      error: (errorData) => {
        this.errorMessage = errorData;
      },
      complete: () => {
        console.info('User Data ok');
      },
    });
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
        .updateUser(this.userId, this.registerForm.value as User)
        .subscribe({
          next: () => {
            this.editMode = false;
            this.user = this.registerForm.value as User;
          },
          error: (errorData) => console.error(errorData),
        });
    }
  }
}

/*this.userService.getUser(environment.userId).subscribe({
      next: (userData) => {
        console.log(userData);
        this.user = userData;
        this.registerForm.controls.id.setValue(userData.id);
        this.registerForm.controls.realname.setValue(userData.realname);
        this.registerForm.controls.surname.setValue(userData.surname);
      },
      error: (errorData) => {
        this.errorMessage = errorData;
      },
      complete: () => {
        console.info('User Data ok');
      },
    });

    this.loginService.userLoginOn.subscribe({
      next: (userLoginOn) => {
        this.userLoginOn = userLoginOn;
      },
    });
  }

  ngOnInit(): void {
    this.userService.getUserId().subscribe((id) => {
      this.userId = id;
    });
  }

  get realname() {
    return this.registerForm.controls.realname;
  }

  get surname() {
    return this.registerForm.controls.surname;
  }

  savePersonalDetailsData() {
    if (this.registerForm.valid) {
      this.userService
        .updateUser(environment.userId, this.registerForm.value as User)
        .subscribe({
          next: () => {
            this.editMode = false;
            this.user = this.registerForm.value as User;
          },
          error: (errorData) => console.error(errorData),
        });
    }
  }
}*/
