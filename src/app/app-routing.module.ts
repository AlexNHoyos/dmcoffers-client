import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { adminGuard } from './guards/admin.guard';
import { NotAuthorizedComponent } from './components/not-authorized/not-authorized.component';

import { LoginComponent } from './auth/login/login.component';

import { AppComponent } from './app.component';

import { PublisherComponent } from './aplicacion/publishers/publishers.component';
import { PublisherCreateComponent } from './aplicacion/publishers/publisher-create/publisher-create.component';
import { PublisherUpdateComponent } from './aplicacion/publishers/publisher-update/publisher-update.component';

import { CategoriasComponent } from './aplicacion/categorias/categorias.component';
import { CategoriaCreateComponent } from './aplicacion/categorias/categoria-create/categoria-create.component';
import { CategoriaUpdateComponent } from './aplicacion/categorias/categoria-update/categoria-update.component';
import { DesarrolladoresComponent } from './aplicacion/desarrolladores/desarrolladores.component';
import { DesarrolladoresCreateComponent } from './aplicacion/desarrolladores/desarrolladores-create/desarrolladores-create.component';
import { DesarrolladoresUpdateComponent } from './aplicacion/desarrolladores/desarrolladores-update/desarrolladores-update.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { JuegoDetailComponent } from './aplicacion/juegos/juego-detail/juego-detail.component';
import { ResultadosBusquedaComponent } from './aplicacion/juegos/resultados-busqueda/resultados-busqueda.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { PersonalDetailsComponent } from './pages/personal-details/personal-details.component';
import { SoporteComponent } from './components/soporte/soporte.component';
import { JuegosComponent } from './aplicacion/juegos/juegos.component';
import { CartComponent } from './pages/cart/cart.component';
import { LibraryComponent } from './pages/library/library.component';

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
  { path: 'soporte', component: SoporteComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'info', component: PersonalDetailsComponent },
  { path: 'juego/:id', component: JuegoDetailComponent },
  { path: 'wishlist', component: WishlistComponent },
  { path: 'biblioteca', component: LibraryComponent },
  { path: 'cart', component: CartComponent},
  { path: 'categorias', component: CategoriasComponent, canActivate: [adminGuard], },
  { path: 'publicadores', component: PublisherComponent, canActivate: [adminGuard], },
  { path: 'juegos', component: JuegosComponent, canActivate: [adminGuard], },
  { path: 'desarrolladores', component: DesarrolladoresComponent, canActivate: [adminGuard], },
  /*{ path: 'create-publisher', component: PublisherCreateComponent,
    canActivate: [adminGuard], },
  { path: 'editP/:id', component: PublisherUpdateComponent },
  { path: 'categorias', component: CategoriasComponent },
  { path: 'create-categoria', component: CategoriaCreateComponent },
  { path: 'editC/:id', component: CategoriaUpdateComponent },
  { path: 'desarrolladores', component: DesarrolladoresComponent },
  { path: 'create-desarrollador', component: DesarrolladoresCreateComponent },
  { path: 'editD/:id', component: DesarrolladoresUpdateComponent },*/
  { path: '**', redirectTo: '/inicio', pathMatch: 'full' }, //redireccionar a inicio si no hay match
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppRoutingModule { }
