import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { adminGuard } from './guards/admin.guard';
import { authGuard } from './guards/auth.guard';
import { NotAuthorizedComponent } from './components/not-authorized/not-authorized.component';

import { LoginComponent } from './auth/login/login.component';

import { AppComponent } from './app.component';

import { PublisherComponent } from './aplicacion/publishers/publishers.component';

import { CategoriasComponent } from './aplicacion/categorias/categorias.component';
import { DesarrolladoresComponent } from './aplicacion/desarrolladores/desarrolladores.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { JuegoDetailComponent } from './aplicacion/juegos/juego-detail/juego-detail.component';
import { ResultadosBusquedaComponent } from './aplicacion/juegos/resultados-busqueda/resultados-busqueda.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { PersonalDetailsComponent } from './pages/personal-details/personal-details.component';
import { SoporteComponent } from './components/soporte/soporte.component';
import { CartComponent } from './pages/cart/cart.component';
import { LibraryComponent } from './pages/library/library.component';
import { JuegosCrudComponent } from './aplicacion/juegos/juegos-crud/juegos-crud.component';
import { SupportTicketComponent } from './aplicacion/support-ticket/support-ticket.component';
import { UsuariosComponent } from './aplicacion/usuarios/usuarios.component';
import { HostingComponent } from './aplicacion/hosting/hosting.component';

const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio', component: HomeComponent },
  { path: 'resultados', component: ResultadosBusquedaComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [adminGuard],
  },
  { path: 'not-authorized', component: NotAuthorizedComponent },
  { path: 'usuarios', component: UsuariosComponent,canActivate: [adminGuard]},
  { path: 'soporte', component: SoporteComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'info', component: PersonalDetailsComponent },
  { path: 'juego/:id', component: JuegoDetailComponent },
  { path: 'wishlist', component: WishlistComponent, canActivate: [authGuard], },
  { path: 'biblioteca', component: LibraryComponent , canActivate: [authGuard],},
  { path: 'cart', component: CartComponent},
  { path: 'hostings', component: HostingComponent, canActivate: [adminGuard], },
  { path: 'categorias', component: CategoriasComponent, canActivate: [adminGuard], },
  { path: 'publicadores', component: PublisherComponent, canActivate: [adminGuard], },
  { path: 'juegos', component: JuegosCrudComponent, canActivate: [adminGuard], },
  { path: 'desarrolladores', component: DesarrolladoresComponent, canActivate: [adminGuard], },
  { path: 'support-ticket', component: SupportTicketComponent },
  { path: '**', redirectTo: '/inicio', pathMatch: 'full' }, //redireccionar a inicio si no hay match
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppRoutingModule { }
