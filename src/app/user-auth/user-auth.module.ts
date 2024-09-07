import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
//import { UserRegisterComponent } from './user-register/user-register.component';
//import { UserAuthService } from './user-auth.service';
//import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  //{ path: 'login', component: LoginComponent },        // Ruta para 'login'
  //{ path: 'register', component: UserRegisterComponent },  // Ruta para 'register'
];

@NgModule({
  declarations: [
    //UserRegisterComponent,
  ],
  imports: [
    CommonModule,
    // UserRegisterComponent
  ],
  providers: [
    //UserAuthService
  ],
  exports: []
})
export class UserAuthModule { }
