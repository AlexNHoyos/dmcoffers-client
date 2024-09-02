import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRegisterComponent } from './user-register/user-register.component.js';
import { UserSessionService } from './usersession.service.js';

@NgModule({
  declarations: [
    UserRegisterComponent
  ],
  imports: [
    CommonModule,
    UserRegisterComponent
  ],
  providers: [
    UserSessionService
  ]
})
export class UserSessionModule { }
