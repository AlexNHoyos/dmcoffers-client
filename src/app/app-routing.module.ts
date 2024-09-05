import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { PublisherCreateComponent } from './components/publishers/publisher-create/publisher-create.component';
import { PublisherUpdateComponent } from './components/publishers/publisher-update/publisher-update.component';
import { PublisherComponent } from './components/publishers/publishers.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  //{ path: '', redirectTo: '/publishers', pathMatch: 'full' },
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio', component: DashboardComponent },
  { path: 'iniciar-sesion', component: LoginComponent },
  { path: 'publishers', component: PublisherComponent },
  { path: 'create-publisher', component: PublisherCreateComponent },
  { path: 'editP/:id', component: PublisherUpdateComponent },
  { path: '**', redirectTo: '/inicio', pathMatch: 'full' }, //redireccionar a inicio si no hay match
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppRoutingModule {}
