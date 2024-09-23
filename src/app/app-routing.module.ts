import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';

import { AppComponent } from './app.component';
import { PersonalDetailsComponent } from './components/personal-details/personal-details.component';

import { PublisherComponent } from './aplicacion/publishers/publishers.component';
import { PublisherCreateComponent } from './aplicacion/publishers/publisher-create/publisher-create.component';
import { PublisherUpdateComponent } from './aplicacion/publishers/publisher-update/publisher-update.component';

import { CategoriasComponent } from './aplicacion/categorias/categorias.component';
import { CategoriaCreateComponent } from './aplicacion/categorias/categoria-create/categoria-create.component';
import { CategoriaUpdateComponent } from './aplicacion/categorias/categoria-update/categoria-update.component';
import { DesarrolladoresComponent } from './aplicacion/desarrolladores/desarrolladores.component';
import { DesarrolladoresCreateComponent } from './aplicacion/desarrolladores/desarrolladores-create/desarrolladores-create.component';
import { DesarrolladoresUpdateComponent } from './aplicacion/desarrolladores/desarrolladores-update/desarrolladores-update.component';

const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'info', component: PersonalDetailsComponent },
  { path: 'publishers', component: PublisherComponent },
  { path: 'create-publisher', component: PublisherCreateComponent },
  { path: 'editP/:id', component: PublisherUpdateComponent },
  { path: 'categorias', component: CategoriasComponent },
  { path: 'create-categoria', component: CategoriaCreateComponent },
  { path: 'editC/:id', component: CategoriaUpdateComponent },
  { path: 'desarrolladores', component: DesarrolladoresComponent },
  { path: 'create-desarrollador', component: DesarrolladoresCreateComponent },
  { path: 'editD/:id', component: DesarrolladoresUpdateComponent },
  { path: '**', redirectTo: '/inicio', pathMatch: 'full' }, //redireccionar a inicio si no hay match
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppRoutingModule { }
