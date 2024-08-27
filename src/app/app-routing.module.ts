import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRegisterComponent } from './user-register/user-register.component';

const routes: Routes = [
  { path: 'user-register', component: UserRegisterComponent },
  /*   {
      path: '', redirectTo: 'dashboard',  canActivate: [AuthGuard], 
      children: [
        { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
        { path: 'dashboard' , component: DashboardComponent, canLoad: [AuthGuard] },
    { path: '**', redirectTo: '/dmcoffers/dashboard' }
      ]
    },
    {path: '**', redirectTo: 'login'} */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
