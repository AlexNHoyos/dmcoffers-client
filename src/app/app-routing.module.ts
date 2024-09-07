import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { LoginComponent } from './login/login.component';
import { UserRegisterComponent } from './user-auth/user-register/user-register.component';

const routes: Routes = [
  //{ path: 'login', component: LoginComponent },        // Ruta para 'login'
  { path: 'register', component: UserRegisterComponent },  // Ruta para 'register'
  { path: '', redirectTo: '/login', pathMatch: 'full' },  // Redirigir a 'login' por defecto
  { path: '**', redirectTo: '/login' }  // Redirigir cualquier ruta no encontrada a 'login'
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
